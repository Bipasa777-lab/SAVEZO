"""
Advanced Deepfake Detection Models
- Xception (Image-based)
- Vision Transformer (ViT)
- FFT + CNN + LSTM (Frequency domain analysis)
"""

import torch
import torch.nn as nn
import timm
import numpy as np
import cv2
from typing import Optional, List
from torch.utils.data import Dataset, DataLoader
import torchvision.transforms as transforms


# =============================================================================
# MODEL 1: Xception Deepfake Detector (Image-based)
# =============================================================================

class XceptionDeepfake(nn.Module):
    """
    Xception-based Deepfake Detector.
    #1 official baseline for FaceForensics++, DFDC, Celeb-DF.
    
    Architecture:
    - Input Image (299×299×3)
    - Depthwise Separable Convolutions
    - 36 Conv Layers + Residual Connections
    - Global Average Pooling
    - Fully Connected Layer
    - Output (Real/Fake)
    """
    
    def __init__(self, pretrained: bool = True):
        super(XceptionDeepfake, self).__init__()
        # Use timm library for Xception model (use legacy_xception for newer timm versions)
        self.model = timm.create_model("legacy_xception", pretrained=pretrained)
        # Replace classifier for binary classification
        in_features = self.model.fc.in_features
        self.model.fc = nn.Linear(in_features, 1)
    
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        """Forward pass."""
        return torch.sigmoid(self.model(x))


# =============================================================================
# MODEL 2: Vision Transformer (ViT) Deepfake Detector
# =============================================================================

class ViTDeepfake(nn.Module):
    """
    Vision Transformer (ViT) Deepfake Detector.
    Captures global texture anomalies + GAN fingerprints.
    
    Architecture:
    - Input Image (224×224)
    - Split into patches (16×16)
    - Linear Patch Embedding
    - Transformer Encoder (12 layers)
    - CLS Token
    - Fully Connected Layer
    - Output: Real/Fake
    """
    
    def __init__(self, pretrained: bool = True, model_name: str = "vit_base_patch16_224"):
        super(ViTDeepfake, self).__init__()
        # Use timm library for ViT model
        self.model = timm.create_model(model_name, pretrained=pretrained)
        # Replace classifier for binary classification
        in_features = self.model.head.in_features
        self.model.head = nn.Linear(in_features, 1)
    
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        """Forward pass."""
        return torch.sigmoid(self.model(x))


# =============================================================================
# MODEL 3: FFT + CNN + LSTM Hybrid Detector
# =============================================================================

def fft_transform(frame: np.ndarray) -> np.ndarray:
    """
    Apply FFT (Fast Fourier Transform) to a frame.
    Converts spatial domain to frequency domain to detect GAN artifacts.
    
    Args:
        frame: Input frame (H, W, C) in BGR format
    
    Returns:
        Magnitude spectrum (224, 224)
    """
    # Convert to grayscale
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    
    # Apply FFT
    fft = np.fft.fft2(gray)
    fft_shift = np.fft.fftshift(fft)
    
    # Compute magnitude spectrum
    magnitude = 20 * np.log(np.abs(fft_shift) + 1)
    
    # Resize to standard input size
    magnitude = cv2.resize(magnitude, (224, 224))
    
    return magnitude


def extract_fft_frames(video_path: str, max_frames: int = 32) -> np.ndarray:
    """
    Extract FFT-transformed frames from a video.
    
    Args:
        video_path: Path to video file
        max_frames: Maximum number of frames to extract
    
    Returns:
        Array of FFT frames (max_frames, 224, 224)
    """
    from frame_extractor import extract_frames
    
    # Get regular frames
    frames = extract_frames(video_path, max_frames)
    
    # Apply FFT to each frame
    fft_frames = []
    for frame in frames:
        fft_frame = fft_transform(frame)
        fft_frames.append(fft_frame)
    
    return np.array(fft_frames)


class FFTVideoDataset(Dataset):
    """
    Dataset for FFT-transformed videos.
    Used with FFT + CNN + LSTM model.
    """
    
    def __init__(self, video_paths: List[str], labels: List[int], max_frames: int = 32):
        self.videos = video_paths
        self.labels = labels
        self.max_frames = max_frames
    
    def __len__(self):
        return len(self.videos)
    
    def __getitem__(self, idx: int):
        # Extract FFT frames
        fft_frames = extract_fft_frames(self.videos[idx], self.max_frames)
        
        # Convert to tensor: (frames, H, W) -> (frames, 1, H, W)
        fft_frames = torch.tensor(fft_frames).unsqueeze(1)
        
        # Label
        label = torch.tensor(self.labels[idx], dtype=torch.float32)
        
        return fft_frames.float(), label


class FFT_CNN_LSTM(nn.Module):
    """
    FFT + CNN + LSTM Hybrid Model.
    Best for GAN artifact detection using frequency fingerprints.
    
    Architecture:
    - Input: FFT-transformed frames
    - CNN: Extract high-frequency artifact features
    - LSTM: Learn temporal abnormalities
    - Output: Real/Fake
    """
    
    def __init__(
        self,
        cnn_channels: List[int] = [1, 8, 16, 32],
        lstm_hidden_size: int = 128,
        num_lstm_layers: int = 2,
        dropout: float = 0.3
    ):
        super(FFT_CNN_LSTM, self).__init__()
        
        # CNN Feature Extractor
        self.cnn = nn.Sequential(
            # Block 1
            nn.Conv2d(cnn_channels[0], cnn_channels[1], kernel_size=3, padding=1),
            nn.BatchNorm2d(cnn_channels[1]),
            nn.ReLU(),
            nn.MaxPool2d(2),  # 112x112
            
            # Block 2
            nn.Conv2d(cnn_channels[1], cnn_channels[2], kernel_size=3, padding=1),
            nn.BatchNorm2d(cnn_channels[2]),
            nn.ReLU(),
            nn.MaxPool2d(2),  # 56x56
            
            # Block 3
            nn.Conv2d(cnn_channels[2], cnn_channels[3], kernel_size=3, padding=1),
            nn.BatchNorm2d(cnn_channels[3]),
            nn.ReLU(),
            nn.MaxPool2d(2),  # 28x28
            
            # Global Average Pooling
            nn.AdaptiveAvgPool2d((1, 1))
        )
        
        # Calculate CNN output size
        self.cnn_output_dim = cnn_channels[-1]  # 32
        
        # LSTM for Temporal Learning
        self.lstm = nn.LSTM(
            input_size=self.cnn_output_dim,
            hidden_size=lstm_hidden_size,
            num_layers=num_lstm_layers,
            batch_first=True,
            bidirectional=True,
            dropout=dropout if num_lstm_layers > 1 else 0
        )
        
        # Classification Layer
        self.fc = nn.Sequential(
            nn.Dropout(dropout),
            nn.Linear(lstm_hidden_size * 2, 64),
            nn.ReLU(),
            nn.Dropout(dropout),
            nn.Linear(64, 1)
        )
    
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        """
        Forward pass.
        
        Args:
            x: Input tensor (batch, frames, channels, height, width)
        
        Returns:
            Output tensor (batch, 1)
        """
        batch, frames, c, h, w = x.size()
        
        # Reshape for CNN: (batch * frames, channels, height, width)
        x = x.view(batch * frames, c, h, w)
        
        # CNN Feature Extraction
        features = self.cnn(x)  # (batch * frames, cnn_output_dim, 1, 1)
        features = features.squeeze(-1).squeeze(-1)  # (batch * frames, cnn_output_dim)
        
        # Reshape for LSTM: (batch, frames, cnn_output_dim)
        features = features.view(batch, frames, self.cnn_output_dim)
        
        # LSTM Temporal Learning
        lstm_out, _ = self.lstm(features)
        
        # Use last hidden state
        last_hidden = lstm_out[:, -1, :]  # (batch, lstm_hidden_size * 2)
        
        # Classification
        out = self.fc(last_hidden)
        
        return torch.sigmoid(out)


# =============================================================================
# Image Dataset for Xception and ViT
# =============================================================================

class ImageDeepfakeDataset(Dataset):
    """
    Dataset for image-based deepfake detection (Xception, ViT).
    """
    
    def __init__(
        self,
        image_paths: List[str],
        labels: List[int],
        transform: Optional[transforms.Compose] = None,
        image_size: int = 299  # Xception default
    ):
        self.paths = image_paths
        self.labels = labels
        
        # Default transforms
        if transform is None:
            self.transform = transforms.Compose([
                transforms.ToPILImage(),
                transforms.Resize((image_size, image_size)),
                transforms.ToTensor(),
                transforms.Normalize(
                    mean=[0.485, 0.456, 0.406],
                    std=[0.229, 0.224, 0.225]
                )
            ])
        else:
            self.transform = transform
    
    def __len__(self):
        return len(self.paths)
    
    def __getitem__(self, idx: int):
        # Read image
        img = cv2.imread(self.paths[idx])
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        
        # Apply transforms
        img = self.transform(img)
        
        # Label
        lbl = torch.tensor(self.labels[idx], dtype=torch.float32)
        
        return img, lbl


# =============================================================================
# Training and Evaluation Functions
# =============================================================================

def train_model(
    model: nn.Module,
    train_loader: DataLoader,
    val_loader: Optional[DataLoader] = None,
    epochs: int = 5,
    learning_rate: float = 1e-4,
    device: Optional[str] = None,
    model_name: str = "model"
) -> dict:
    """
    Train a deepfake detection model.
    
    Args:
        model: The model to train
        train_loader: Training data loader
        val_loader: Validation data loader
        epochs: Number of training epochs
        learning_rate: Learning rate
        device: Device to use ('cuda' or 'cpu')
        model_name: Name for logging
    
    Returns:
        Training history dictionary
    """
    if device is None:
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    
    model = model.to(device)
    criterion = nn.BCELoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=learning_rate)
    
    history = {'train_loss': [], 'val_loss': [], 'train_acc': [], 'val_acc': []}
    
    for epoch in range(epochs):
        # Training
        model.train()
        loss_total = 0
        correct = 0
        total = 0
        
        for imgs, labels in train_loader:
            imgs, labels = imgs.to(device), labels.to(device)
            
            optimizer.zero_grad()
            preds = model(imgs).squeeze()
            loss = criterion(preds, labels)
            loss.backward()
            optimizer.step()
            
            loss_total += loss.item()
            predicted = (preds >= 0.5).float()
            correct += (predicted == labels).sum().item()
            total += labels.size(0)
        
        train_loss = loss_total / len(train_loader)
        train_acc = correct / total
        history['train_loss'].append(train_loss)
        history['train_acc'].append(train_acc)
        
        # Validation
        if val_loader is not None:
            model.eval()
            val_loss_total = 0
            val_correct = 0
            val_total = 0
            
            with torch.no_grad():
                for imgs, labels in val_loader:
                    imgs, labels = imgs.to(device), labels.to(device)
                    preds = model(imgs).squeeze()
                    loss = criterion(preds, labels)
                    
                    val_loss_total += loss.item()
                    predicted = (preds >= 0.5).float()
                    val_correct += (predicted == labels).sum().item()
                    val_total += labels.size(0)
            
            val_loss = val_loss_total / len(val_loader)
            val_acc = val_correct / val_total
            history['val_loss'].append(val_loss)
            history['val_acc'].append(val_acc)
            
            print(f"{model_name} - Epoch {epoch+1}/{epochs} - "
                  f"Train Loss: {train_loss:.4f}, Train Acc: {train_acc:.4f} - "
                  f"Val Loss: {val_loss:.4f}, Val Acc: {val_acc:.4f}")
        else:
            print(f"{model_name} - Epoch {epoch+1}/{epochs} - "
                  f"Train Loss: {train_loss:.4f}, Train Acc: {train_acc:.4f}")
    
    return history


def evaluate_model(
    model: nn.Module,
    data_loader: DataLoader,
    device: Optional[str] = None
) -> dict:
    """
    Evaluate a deepfake detection model.
    
    Args:
        model: The model to evaluate
        data_loader: Data loader
        device: Device to use
    
    Returns:
        Dictionary with evaluation metrics
    """
    if device is None:
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    
    model.eval()
    all_preds = []
    all_labels = []
    
    with torch.no_grad():
        for imgs, labels in data_loader:
            imgs = imgs.to(device)
            preds = model(imgs).cpu().numpy().flatten()
            all_preds.extend(preds)
            all_labels.extend(labels.numpy())
    
    # Binary predictions
    bin_preds = [1 if p >= 0.5 else 0 for p in all_preds]
    
    # Confusion Matrix
    from sklearn.metrics import confusion_matrix, roc_auc_score
    cm = confusion_matrix(all_labels, bin_preds)
    
    # ROC-AUC
    roc_auc = roc_auc_score(all_labels, all_preds)
    
    # Accuracy
    accuracy = sum([1 for p, l in zip(bin_preds, all_labels) if p == l]) / len(all_labels)
    
    return {
        'confusion_matrix': cm,
        'roc_auc': roc_auc,
        'accuracy': accuracy,
        'y_true': all_labels,
        'y_pred': all_preds
    }


# =============================================================================
# Quick Test Functions
# =============================================================================

def test_models():
    """Test all models with dummy input."""
    print("Testing Advanced Deepfake Detection Models")
    print("=" * 50)
    
    # Test Xception
    print("\n1. Testing XceptionDeepfake...")
    model = XceptionDeepfake(pretrained=False)
    x = torch.randn(2, 3, 299, 299)
    output = model(x)
    print(f"   Input: {x.shape} -> Output: {output.shape}")
    
    # Test ViT
    print("\n2. Testing ViTDeepfake...")
    model = ViTDeepfake(pretrained=False)
    x = torch.randn(2, 3, 224, 224)
    output = model(x)
    print(f"   Input: {x.shape} -> Output: {output.shape}")
    
    # Test FFT + CNN + LSTM
    print("\n3. Testing FFT_CNN_LSTM...")
    model = FFT_CNN_LSTM()
    x = torch.randn(2, 32, 1, 224, 224)
    output = model(x)
    print(f"   Input: {x.shape} -> Output: {output.shape}")
    
    print("\n" + "=" * 50)
    print("All models tested successfully!")


if __name__ == "__main__":
    test_models()
