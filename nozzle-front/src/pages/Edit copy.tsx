import { Col, Row, Spinner } from "react-bootstrap"
import { ImageContext } from '../context/ImageContext';
import { useContext, useEffect, useState } from "react";
import axios from "axios";

const Edit = () => {
  const { uploadedImage,setUploadedImage } = useContext(ImageContext) || { uploadedImage: null, setUploadedImage: () => {} }; // 기본값 추가
  // const { uploadedImage, setUploadedImage } = useContext(ImageContext) || { uploadedImage: null, setUploadedImage: () => {} }; // 기본값 추가
  // console.log("uploadedImage uploadedImage", uploadedImage)
  const [tempDelay, setTempDelay]= useState<boolean>(false)
  const [tempPrompt, setTempPrompt]= useState<string>("")
  
  // {delay && <div className="loading">Loading&#8230;</div>}
  const editPromptImage= async()=>{
    setTempDelay(true)
    let temp = uploadedImage;
    let temp2= "";
  if (temp) { // temp가 null이 아닐 때만 실행
    temp2= temp.replace(/^data:image\/png;base64,/, ''); // 'data:image/png;base64,' 제거
    console.log(temp2)
  }
    try {
      const { data } = await axios.post('/dev/edit', {
        prompt: tempPrompt,
        input_image_base64: temp2, // 프롬프트 데이터
        }, {
            // responseType: 'blob' // Blob 형식으로 응답 받기
        });
        console.log(data)
    // console.log(response.data.image_base64)
    //     // Blob 데이터를 URL로 변환
    //     // const imageBlob = response.data;
    //     // const imageUrl = URL.createObjectURL(imageBlob);
    //     // setImageUrl(imageUrl); // 이미지 URL 설정
        const base64Image = data.generated_image_base64; // Base64 문자열
        // console.log("1234",base64Image)
        setUploadedImage(`data:image/png;base64,${base64Image}`); // 이미지 URL 설정
        setTempDelay(false)
    } catch (error) {
      setTempDelay(false)
        console.error('Error generating image:', error);
    }
};
  useEffect(()=>{

  },[uploadedImage])



  return (
<Row id="section2" className='full-page-section-prompt'>
<Col xs={10} md={10} lg={5} className='fw-bold text-white mt-5 prompt-text'>
<div className="" style={{height:"7vh", borderBottom:"2px solid rgba(51, 51, 51, 1)"}}>
  <Col lg={12}>프롬프트로 이미지 편집하기</Col>
  <p className='edit-text'>이미지를 클릭하여 영역을 만들고 프롬프트로 편집해보세요!</p>

    </div>
    {tempDelay && <Spinner/>}
    {uploadedImage && 
    <img 
    src={uploadedImage || ''} 
    alt="Uploaded" 
    className="uploaded-image mt-3" 
    style={{ width: '100%', height: '60vh' }}/>}
<Col lg={12} className='mt-4 prompt-input' style={{ position: 'relative' }}>
        <input type='text' onChange={(e) => setTempPrompt(e.target.value)} placeholder="선택한 영역을 프롬프트로 편집하기 ex ) '배경 제거' 또는 '인페인팅'"  />
        
    </Col>
    <Col lg={12} className="w-100">
    <button onClick={editPromptImage} className='generate-button-temp mt-2'>편집하기</button>
    </Col>
</Col>
      </Row>
  )
}

export default Edit
