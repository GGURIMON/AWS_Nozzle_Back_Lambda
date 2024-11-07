const Footer = () => {
  return (
    <div>
    <div className="footer">
      <div>
        <div className="m-0">PicShare</div>
        <div>github : <a target="_blank" href="https://github.com/CHAe-sheng/Nozzel_Final_project.git">https://github.com/CHAe-sheng/Nozzel_Final_project.git</a></div>
        <p>광주 인공지능 사관학교 실전 프로젝트 | nozzle ( 임채승, 송채빈, 김동관, 김유열 )</p>
        <p style={{ color: "rgba(184, 184, 184, 1)", borderBottom: "1px solid gray" }}></p>
        <div>Copyright ⓒ 모바일 앱개발 협동조합 X 팀 노즐</div>
      </div>

    </div>
    <div style={{ backgroundColor: "black", padding: "0 14px" }}>
        <img src="logo.png" alt="로고" style={{ height: "50px" }} />
      </div>
        </div>
  )
}

export default Footer
