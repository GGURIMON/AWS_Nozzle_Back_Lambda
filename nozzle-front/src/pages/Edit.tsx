import { Col, Row, Spinner } from "react-bootstrap";
import { ImageContext } from '../context/ImageContext';
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Stage, Layer, Image as KonvaImage, Line, Group, Circle } from 'react-konva';

const Edit = () => {
  const { uploadedImage, setUploadedImage } = useContext(ImageContext) || { uploadedImage: null, setUploadedImage: () => { } };
  const [points, setPoints] = useState<number[]>([]);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const stageRef = useRef(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number, height: number }>({ width: 0, height: 0 });
  const [isComplete, setIsComplete] = useState(false);
  const [tempDelay, setTempDelay] = useState(false);
  const [tempPrompt, setTempPrompt] = useState("");
  const [imgDataUrl, setImgDataUrl] = useState<string>("")

  // Edit Image Function
  const editPromptImage = async () => {
    setTempDelay(true);
    let temp = uploadedImage;
    let tempMarking = imgDataUrl;
    let temp2 = "";
    let tempMarking2 = "";
    if (temp) {
      temp2 = temp.replace(/^data:image\/png;base64,/, '');
    }
    if (tempMarking) {
      tempMarking2 = tempMarking.replace(/^data:image\/png;base64,/, '');
    }
    try {
      const { data } = await axios.post('https://x8txu4fs3e.execute-api.ap-northeast-2.amazonaws.com/dev/edit', {
        prompt: tempPrompt,
        input_image_base64: temp2,
        marking_image_base64: tempMarking2,
      });
      const base64Image = data.generated_image_base64;
      setUploadedImage(`data:image/png;base64,${base64Image}`);
      setTempDelay(false);
    } catch (error) {
      setTempDelay(false);
      console.error('Error generating image:', error);
    }
  };

  // Update Dimensions on Resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Load Image
  useEffect(() => {
    if (uploadedImage) {
      const img = new window.Image();
      img.src = uploadedImage;
      img.onload = () => setImage(img);
    }
  }, [uploadedImage]);

  // Handle Click for Polygon Points
  const handleClick = (e: any) => {
    if (isComplete) return;

    const { x, y } = e.target.getStage().getPointerPosition();

    // Check if the click is near the first point to close the polygon
    if (points.length >= 4 && distance(x, y, points[0], points[1]) < 10) {
      setPoints((prev) => [...prev, points[0], points[1]]);
      setIsComplete(true);
    } else {
      setPoints((prev) => [...prev, x, y]);
    }
  };

  // Calculate Distance
  const distance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  };

  // Handle Point Dragging
  const handleDragMove = (index: number, newPos: any) => {
    const updatedPoints = points.slice();
    updatedPoints[index] = newPos.x;
    updatedPoints[index + 1] = newPos.y;
    setPoints(updatedPoints);
    handleMaskAndSend()
  };
  const handleMaskAndSend = async () => {
    // const stage = stageRef.current;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Canvas 크기 설정
    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // 흰 배경 채우기cc
    if (context) {
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // 폴리곤 마스킹 처리
      context.beginPath();
      context.moveTo(points[0], points[1]);
      for (let i = 2; i < points.length; i += 2) {
        context.lineTo(points[i], points[i + 1]);
      }
      context.closePath();
      context.fillStyle = 'black'; // 마스크 색상
      context.fill();
    }
    // 생성된 이미지를 확인하기
    const markingImg = canvas.toDataURL('image/png');
    setImgDataUrl(markingImg)
    console.log(imgDataUrl);

  };
  return (
    <Row id="section2" className='full-page-section-prompt'>
      <Col xs={10} md={10} lg={5} className='fw-bold text-white mt-5 prompt-text'>
        <div style={{ height: "7vh", borderBottom: "2px solid rgba(51, 51, 51, 1)" }}>
          <Col lg={12}>프롬프트로 이미지 편집하기</Col>
          <p className='edit-text'>이미지를 클릭하여 영역을 만들고 프롬프트로 편집해보세요!</p>
        </div>
        {tempDelay && <Spinner />}
        {uploadedImage &&
          <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '60vh' }}>
            <Stage
              width={dimensions.width}
              height={dimensions.height}
              ref={stageRef}
              onClick={handleClick}
            >
              <Layer>
                {image && <KonvaImage x={0} y={0} width={dimensions.width} height={dimensions.height} image={image} />}
                <Group>
                  <Line points={points} stroke="red" strokeWidth={2} closed={isComplete} fill="rgba(255, 0, 0, 0.5)" />
                  {points.map((_, index) =>
                    index % 2 === 0 ? (
                      <Circle
                        key={index}
                        x={points[index]}
                        y={points[index + 1]}
                        radius={5}
                        fill="blue"
                        draggable
                        onDragMove={(e) => handleDragMove(index, e.target.position())}
                      />
                    ) : null
                  )}
                </Group>
              </Layer>
            </Stage>
          </div>
        }
        <Col lg={12} className='mt-4 prompt-input' style={{ position: 'relative' }}>
          <input type='text' onChange={(e) => setTempPrompt(e.target.value)} placeholder="선택한 영역을 프롬프트로 편집하기 ex ) '배경 제거' 또는 '인페인팅'" />
        </Col>
        <Col lg={12} className="w-100">
          <button onClick={editPromptImage} className='generate-button-temp mt-2'>편집하기</button>
        </Col>
      </Col>
    </Row>
  );
}

export default Edit;
