import React, { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ImageContext } from '../context/ImageContext';


const Content = () => {
    const { uploadedImage, setUploadedImage } = useContext(ImageContext) || { uploadedImage: null, setUploadedImage: () => {} }; // 기본값 추가
    const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null); // 이미지 크기 상태

    console.log(uploadedImage)
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageUrl = event.target?.result as string; // Base64 URL
                setUploadedImage(imageUrl); // 업로드된 이미지 URL 설정
            };
            reader.readAsDataURL(files[0]); // 파일을 Base64로 읽기
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); // 기본 동작 방지
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); // 기본 동작 방지
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageUrl = event.target?.result as string; // Base64 URL
                setUploadedImage(imageUrl); // 업로드된 이미지 URL 설정
                const img = new Image();
                img.src = imageUrl;
                img.onload = () => {
                  const dimensions = { width: img.width, height: img.height };
                  setImageDimensions(dimensions); // 이미지 크기 설정
                  
                    
            };
          };
            reader.readAsDataURL(files[0]); // 파일을 Base64로 읽기
        }
    };
    useEffect(()=>{
      console.log(imageDimensions)
    }
    ,[imageDimensions])

    return (
        <>
            <Row className='full-page-section-1'>
                <Col xs={12} md={12}>
                    <img 
                        className="temp-img"
                        src="image1.png" 
                        alt="123" 
                    />
                </Col>
                
                <Col xs={10} md={10} lg={5} className='fw-bold text-white'>
                    <div className='text-center img-text mb-3'>원하는 이미지를 넣어보세요</div>
                    {uploadedImage ? (
                        <>
                        <img 
                            src={uploadedImage} 
                            alt="Uploaded" 
                            className="uploaded-image" 
                            style={{ width: '100%', height: '45vh' }} // 이미지 스타일 조정
                        />
                        <Link to={'/edit'} className="img-create-btn d-flex align-items-center justify-content-center mt-3">
                                프롬프트로 이미지 편집하러 가기
                            </Link>
                        </>
                    ) : (
                        <div 
                            className='img-drag-upload' 
                            onDragOver={handleDragOver} 
                            onDrop={handleDrop}
                        >
                            <div>여기에 이미지를 드래그하세요</div>
                            
                        </div>
                    )}

                    <Row className='d-flex align-items-center justify-content-center mt-1 g-2'>
                        <Col xs={6} md={6} className="text-center">
                        <label htmlFor="imageUpload" className="img-btn d-flex align-items-center justify-content-center" style={{ cursor: 'pointer' }}>
                            이미지 업로드
                        </label>
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageUpload} 
                            style={{ display: 'none' }} // 여전히 숨김 처리
                            id="imageUpload" 
                        />
                        </Col>
                        <Col xs={6} md={6} className="text-center">
                            <Link to={'/prompt'} className="img-create-btn d-flex align-items-center justify-content-center">
                                AI 이미지 생성하기
                            </Link>
                        </Col>
                        

          
                    </Row>
                </Col>

            </Row>
        </>
    );
}

export default Content;