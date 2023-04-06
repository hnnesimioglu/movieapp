export interface AuthResponse {
    idToken: string;
    email: string;
    refrestToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}