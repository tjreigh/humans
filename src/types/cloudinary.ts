// Parital API response
export type CloudinaryUploadRes = {
	asset_id: string;
	public_id: string;
	width: number;
	height: number;
	resource_type: 'image' | 'raw' | 'video' | 'auto';
	url: string;
	secure_url: string;
	existing: boolean;
	original_filename: string;
};
