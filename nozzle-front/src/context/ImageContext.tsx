// src/context/imageContext.tsx
import React, { createContext } from "react";

// Context의 타입 정의
interface ImageContextType {
    uploadedImage: string | null;
    setUploadedImage: React.Dispatch<React.SetStateAction<string | null>>;
}

// 전역으로 state를 관리하기 위한 context 생성
export const ImageContext = createContext<ImageContextType | undefined>(undefined);
