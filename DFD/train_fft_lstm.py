"""
Training Script for FFT + CNN + LSTM Deepfake Detector
"""

import torch
from torch.utils.data import DataLoader
import argparse
import os

from advanced_models import FFT_CNN_LSTM, FFTVideoDataset, train_model, evaluate_model
from dataset import create_data_splits


def parse_args():
    parser = argparse.ArgumentParser(description='Train FFT+CNN+LSTM Deepfake Detector')
    parser.add_argument('--data_dir', type=str, required=True, help='Path to data directory')
    parser.add_argument('--epochs', type=int, default=10, help='Number of epochs')
    parser.add_argument('--batch_size', type=int, default=8, help='Batch size')
    parser.add_argument('--lr', type=float, default=1e-4, help='Learning rate')
    parser.add_argument('--max_frames', type=int, default=32, help='Max frames per video')
    parser.add_argument('--save_path', type=str, default='checkpoints', help='Save path')
    return parser.parse_args()


def main():
    args = parse_args()
    
    print("=" * 50)
    print("Training FFT + CNN + LSTM Deepfake Detector")
    print("=" * 50)
    
    # Get device
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Device: {device}")
    
    # Create dataset
    real_dir = os.path.join(args.data_dir, 'real')
    fake_dir = os.path.join(args.data_dir, 'fake')
    
    video_paths = []
    labels = []
    
    # Load real videos
    if os.path.exists(real_dir):
        for f in os.listdir(real_dir):
            if f.endswith(('.mp4', '.avi', '.mov', '.mkv')):
                video_paths.append(os.path.join(real_dir, f))
                labels.append(0)
    
    # Load fake videos
    if os.path.exists(fake_dir):
        for f in os.listdir(fake_dir):
            if f.endswith(('.mp4', '.avi', '.mov', '.mkv')):
                video_paths.append(os.path.join(fake_dir, f))
                labels.append(1)
    
    print(f"Total samples: {len(video_paths)}")
    print(f"Real: {labels.count(0)}, Fake: {labels.count(1)}")
    
    # Create data splits
    train_paths, train_labels, val_paths, val_labels, test_paths, test_labels = \
        create_data_splits(video_paths, labels, train_ratio=0.7, val_ratio=0.15, test_ratio=0.15)
    
    # Create datasets
    train_dataset = FFTVideoDataset(train_paths, train_labels, max_frames=args.max_frames)
    val_dataset = FFTVideoDataset(val_paths, val_labels, max_frames=args.max_frames)
    test_dataset = FFTVideoDataset(test_paths, test_labels, max_frames=args.max_frames)
    
    # Create data loaders
    train_loader = DataLoader(train_dataset, batch_size=args.batch_size, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=args.batch_size, shuffle=False)
    test_loader = DataLoader(test_dataset, batch_size=args.batch_size, shuffle=False)
    
    # Create model
    model = FFT_CNN_LSTM()
    model = model.to(device)
    
    # Train
    print("\nStarting training...")
    history = train_model(
        model=model,
        train_loader=train_loader,
        val_loader=val_loader,
        epochs=args.epochs,
        learning_rate=args.lr,
        device=str(device),
        model_name="FFT-CNN-LSTM"
    )
    
    # Save model
    os.makedirs(args.save_path, exist_ok=True)
    save_path = os.path.join(args.save_path, 'fft_lstm.pth')
    torch.save(model.state_dict(), save_path)
    print(f"\nModel saved to: {save_path}")
    
    # Evaluate
    print("\nEvaluating on test set...")
    results = evaluate_model(model, test_loader, device=str(device))
    print(f"Test Accuracy: {results['accuracy']:.4f}")
    print(f"Test ROC-AUC: {results['roc_auc']:.4f}")


if __name__ == "__main__":
    main()
