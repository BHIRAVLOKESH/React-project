import axios from 'axios';
import type { ApiResponse } from '../types/artwork';

const API_BASE_URL = 'https://api.artic.edu/api/v1';

export const fetchArtworks = async (page: number = 1, limit: number = 12): Promise<ApiResponse> => {
    const response = await axios.get<ApiResponse>(`${API_BASE_URL}/artworks`, {
        params: {
            page,
            limit,
            fields: 'id,title,place_of_origin,artist_display,inscriptions,date_start,date_end'
        }
    });
    return response.data;
};
