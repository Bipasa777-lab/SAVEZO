import api from '../lib/api';

export interface Hospital {
  id?: string;
  name: string;
  address: string;
  phone: string;
  email?: string;
  website?: string;
  latitude: number;
  longitude: number;
  distance?: number;
  rating?: number;
  specialties?: string[];
  emergencyServices?: boolean;
  insuranceAccepted?: string[];
}

export interface HospitalResponse {
  success: boolean;
  message?: string;
  data?: any;
}

const hospitalService = {
  getAllHospitals: async (): Promise<Hospital[]> => {
    try {
      const response = await api.get('/hospitals');
      return response.data.hospitals || [];
    } catch (error: any) {
      throw error.response?.data || { message: 'Error fetching hospitals' };
    }
  },

  getHospitalById: async (id: string): Promise<Hospital> => {
    try {
      const response = await api.get(`/hospitals/${id}`);
      return response.data.hospital;
    } catch (error: any) {
      throw error.response?.data || { message: 'Error fetching hospital details' };
    }
  },

  getNearby: async (latitude: number, longitude: number): Promise<Hospital[]> => {
    try {
      const response = await api.get(`/hospitals/nearby?lat=${latitude}&lng=${longitude}`);
      return response.data.hospitals || [];
    } catch (error: any) {
      throw error.response?.data || { message: 'Error fetching nearby hospitals' };
    }
  },

  createHospital: async (hospitalData: Omit<Hospital, 'id'>): Promise<HospitalResponse> => {
    try {
      const response = await api.post('/hospitals', hospitalData);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Error creating hospital' };
    }
  },

  updateHospital: async (id: string, hospitalData: Partial<Hospital>): Promise<HospitalResponse> => {
    try {
      const response = await api.put(`/hospitals/${id}`, hospitalData);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Error updating hospital' };
    }
  },

  deleteHospital: async (id: string): Promise<HospitalResponse> => {
    try {
      const response = await api.delete(`/hospitals/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Error deleting hospital' };
    }
  },

  // Calculate distance between two points using Haversine formula
  calculateDistance: (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in kilometers
  }
};

export default hospitalService;
