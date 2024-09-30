import { API_URL } from '@/main'
import axios from 'axios'

export const getDeviceList = async (token: string | null) => {
  const errorReturn: { hydrometerToken: string | null, devices: any[] } = { hydrometerToken: null, devices: [] }


  if (!token) return errorReturn
  const { data, status } = await axios.get(`${API_URL}/ispindel`, { headers: { Authorization: 'Bearer ' + token } });
  if (status === 200) {
    return data as { hydrometerToken: string, devices: any[] };
  } else {
    console.error('Failed to get device list', status)
    return errorReturn
  }

}

export const getLogs = async (token: string | null, num: number = 5) => {
  if (!token) return []
  const { data, status } = await axios.get(`${API_URL}/ispindel/logs?num=${num}`, { headers: { Authorization: 'Bearer ' + token } });
  if (status === 200) {
    return data as any[];
  } else {
    console.error('Failed to get logs', status)
    return []
  }
}

export const getDeviceDetails = async (token: string | null, deviceId: string) => {
  if (!token) return []
  const { data, status } = await axios.get(`${API_URL}/ispindel/${deviceId}`, { headers: { Authorization: 'Bearer ' + token } });
  if (status === 200) {
    return data as any;
  } else {
    console.error('Failed to get device details', status)
    return []
  }
}

export const getBrew = async (token: string | null, brewId: string) => {
  if (!token) return []
  const { data, status } = await axios.get(`${API_URL}/ispindel/logs/${brewId}`, { headers: { Authorization: 'Bearer ' + token } });
  if (status === 200) {
    return data as any;
  } else {
    console.error('Failed to get device details', status)
    return []
  }
}

export const generateToken = async (token: string) => {
  if (!token) return { token: null };
  const { data, status } = await axios.post(`${API_URL}/ispindel/register`, {}, { headers: { Authorization: 'Bearer ' + token } });

  if (status === 200) {
    console.log(data)
    return data as { token: string | null }
  } else {
    console.error('Failed to get device details', status)
    return { token: null };
  }
}