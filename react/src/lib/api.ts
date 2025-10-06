// API Configuration
const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Generic fetch wrapper with error handling
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    const data: ApiResponse<T> = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'API request failed');
    }

    return data.data as T;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

// Portfolio API
export interface PortfolioItem {
  _id: string;
  title: string;
  category: string;
  client: string;
  year: number;
  image: {
    url: string;
    publicId?: string;
  };
  tags: string[];
  description: string;
  challenge?: string;
  result?: string;
  color?: string;
  featured: boolean;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export async function fetchPortfolioItems(params?: {
  category?: string;
  featured?: boolean;
}): Promise<PortfolioItem[]> {
  const queryParams = new URLSearchParams();
  if (params?.category) queryParams.append('category', params.category);
  if (params?.featured !== undefined) queryParams.append('featured', String(params.featured));
  
  const query = queryParams.toString() ? `?${queryParams}` : '';
  return fetchAPI<PortfolioItem[]>(`/portfolio${query}`);
}

export async function fetchPortfolioById(id: string): Promise<PortfolioItem> {
  return fetchAPI<PortfolioItem>(`/portfolio/${id}`);
}

export async function fetchFeaturedProjects(): Promise<PortfolioItem[]> {
  return fetchPortfolioItems({ featured: true });
}

export async function fetchCategories(): Promise<string[]> {
  return fetchAPI<string[]>('/portfolio/categories');
}

// Contact API
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

export async function submitContact(data: ContactFormData): Promise<any> {
  return fetchAPI('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}