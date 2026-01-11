import api from "./axios.service";

class ServerInterfaceService {
  async get<T = any>(
    url: string,
    params?: Record<string, any>,
    signal?: AbortSignal
  ) {
    const { data } = await api.get<T>(url, {
      params,
      signal,
    });
    return data;
  }

  async post<T = any>(
    url: string,
    params?: Record<string, any>,
    body?: Record<string, any>,
    signal?: AbortSignal
  ) {
    const { data } = await api.post<T>(url, body, {
      params,
      signal,
    });
    return data;
  }

  async patch<T = any>(
    url: string,
    body?: Record<string, any>,
    params?: Record<string, any>,
    signal?: AbortSignal
  ) {
    const { data } = await api.patch<T>(url, body, { params, signal });
    return data;
  }

  async delete<T = any>(
    url: string,
    body: Record<string, any> = {} as Record<string, any>,
    params?: Record<string, any>,
    signal?: AbortSignal
  ): Promise<T> {
    const { data } = await api.delete<T>(url, {
      params,
      data: body,
      signal,
    });
    return data;
  }
}

const serverInterfaceService = new ServerInterfaceService();
export default serverInterfaceService;
