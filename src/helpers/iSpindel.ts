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

export const getLogs = async (token: string | null, start_date: string, end_date: string, device_id: string) => {
  if (!token) return []
  const url = `${API_URL}/ispindel/logs?start_date=${start_date}&end_date=${end_date}&device_id=${device_id}`

  const { data, status } = await axios.get(url, { headers: { Authorization: 'Bearer ' + token } });
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

    return data as { token: string | null }
  } else {
    console.error('Failed to get device details', status)
    return { token: null };
  }
}

export const brew = async (token: string, id: string, brew_name = null) => {
  if (!token) return [];
  const { data, status } = await axios.post(`${API_URL}/ispindel/brew`, { device_id: id, brew_name }, { headers: { Authorization: 'Bearer ' + token } });
  if (status === 200) {
    return data as any[]
  } else {
    console.error('Failed to get device details', status)
    return [];
  }
}

export const updateBrewName = async (token: string | null, id: string, brew_name: string | null = null) => {
  if (!token) return [];
  const { data, status } = await axios.patch(`${API_URL}/ispindel/brew`, { brew_id: id, brew_name }, { headers: { Authorization: 'Bearer ' + token } });
  if (status === 200) {
    return data as any[]
  } else {
    console.error('Failed to get device details', status)
    return [];
  }
}

export const stopBrew = async (token: string, device_id: string, brew_id: string) => {
  if (!token) return [];
  const { data, status } = await axios.patch(`${API_URL}/ispindel/brew`, { device_id, brew_id }, { headers: { Authorization: 'Bearer ' + token } });
  if (status === 200) {
    return data as any[]
  } else {
    console.error('Failed to get device details', status)
    return [];
  }
}

export const updateCoeff = async (token: string, device_id: string, coefficients: number[]) => {
  if (!token) return null;
  const { data, status } = await axios.patch(`${API_URL}/ispindel/device/${device_id}`, { coefficients }, { headers: { Authorization: 'Bearer ' + token } });
  if (status === 200) {

    return data as any
  } else {
    console.error('Failed to get device details', status)
    return null
  }

}

export const fetchAllBrews = async (token: string) => {
  if (!token) return [];
  const { data, status } = await axios.get(`${API_URL}/ispindel/brew`, { headers: { Authorization: 'Bearer ' + token } });

  if (status === 200) {
    return data as any[]
  } else {
    console.error('Failed to get device details', status)
    return [];
  }
}

export const getBrewLogs = async (token: string | null, brewId: string) => {
  if (!token) return [];
  const { data, status } = await axios.get(`${API_URL}/ispindel/logs/${brewId}`, { headers: { Authorization: 'Bearer ' + token } });
  if (status === 200) {
    return data as any[]
  } else {
    console.error('Failed to get device details', status)
    return [];
  }
}


export const deleteLog = async (token: string | null, logId: string, deviceId: string) => {
  if (!token) return null;
  const { data, status } = await axios.delete(`${API_URL}/ispindel/logs/${logId}?device_id=${deviceId}`, { headers: { Authorization: 'Bearer ' + token } });

  if (status === 200) {

    return data as any
  } else {
    console.error('Failed to delete log', status)
    return null;
  }
}

export const updateUserLog = async (token: string | null, log: any) => {
  if (!token) return null;
  const { data, status } = await axios.patch(`${API_URL}/ispindel/logs/${log.id}?device_id=${log.device_id}`, log, { headers: { Authorization: 'Bearer ' + token } });

  if (status === 200) {

    return data as any
  } else {
    console.error('Failed to update log', status)
    return null;
  }
}

export const linkBrew = async (token: string | null, recipe_id: string, brew_id?: string) => {
  if (!token || !brew_id) return null;
  const { data, status } = await axios.patch(`${API_URL}/ispindel/brew/${brew_id}`, { recipe_id }, { headers: { Authorization: 'Bearer ' + token } });

  if (status === 200) {

    return data as any
  } else {
    console.error('Failed to link brew', status)
    return null;
  }

}