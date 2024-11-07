import { Col, Row } from 'react-bootstrap';
import '../App.css';
import Content from '../components/Content';


const Home = () => {

  return (

    <>
<Content/>




    <Row id="section2" className='full-page-section' xs={6} md={6}>
    <Col xs={10} md={10} lg={5} className='fw-bold text-white'>
    <div className='d-flex align-items-center justify-content-center' style={{height:"20vh"}}>
      <div>
    <p className='text-center fs-2'>흐릿한 영감, <span style={{color:"#9dd6e7"}}>정확한</span> AI 이미지생성기</p>
    <p className='text-center section3-text'>단순한 텍스트를 시작적으로 풍성한 아트워크로 변환하는 혁신적인 AI 이미지 생성기로<br/> 상상속에만 있던 영감을 정확하게 표현해보세요. </p>
    </div>
    </div>
    <div className='d-flex align-items-center justify-content-center' style={{height:"70vh"}}>
    <img className='section3-img' src="165002.png" alt="123"/> 
    </div>
    <div className="intro" style={{height:"10vh"}}>
              <a href='#section3' className="scroll-indicator"></a>
          </div>
    </Col>
    
    </Row>

    <Row id="section3" className='full-page-section' xs={6} md={6}>
    <Col xs={10} md={10} lg={5} className='fw-bold text-white'>
    <div className='d-flex align-items-center justify-content-center' style={{height:"20vh"}}>
    <div>
    <p className='text-center fs-2'>영감을 <span style={{color:"#9dd6e7"}}>확장</span>하는 AI 제너레이티브 채우기</p>
    <p className='text-center section3-text'>반짝 떠오른 아이디어에 새로운 영감을 붙여넣으세요. 복잡한 편집 및 수정까지 지원해<br/>창작물을 더 완벽하게 내가 원하는 것으로 만들게 도와줍니다. </p>
    </div>
    </div>
    <div className='d-flex align-items-center justify-content-center' style={{height:"70vh"}}>
    <img className='section3-img' src="165922.png" alt="123"/> 
    </div>
    {/* <div className="intro" style={{height:"10vh"}}>
              <a href='#section5' className="scroll-indicator"></a>
          </div> */}
    </Col>
    </Row>

    </>
  )
}

export default Home
 