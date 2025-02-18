export interface OTPLoginFormProps {
    error?: {
        email?: string;
        otp?: string;
        general?: string;
    };
    isLoading: boolean;
    handleEmailSubmit: (email: string) => Promise<boolean>;
    handleOTPSubmit: (email: string, token: string) => Promise<void>;
    handleGoogleLogin: (accessToken: string) => Promise<void>;
} 