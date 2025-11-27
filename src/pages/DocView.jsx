import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ANOMALIES, RISK_LEVELS, THEME } from '../data/anomalies';

const DocView = () => {
  const { riskId, shortId } = useParams(); // URL 파라미터 받기
  const navigate = useNavigate();

  // "ID가 shortId(예: 0341)로 끝나는" 문서를 찾습니다.
  const selectedDoc = ANOMALIES.find(d => d.id.endsWith(shortId));

  // 문서가 없거나, URL의 등급(riskId)과 문서의 실제 등급이 안 맞으면 에러 처리
  if (!selectedDoc || selectedDoc.risk !== riskId) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">ERROR: INVALID ACCESS PATH</h2>
        <button onClick={() => navigate('/anomalies')} className="underline">
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 bg-white min-h-full">
      {/* 종이 질감 배경 컨테이너 */}
      <div className="border-2 border-black p-6 md:p-10 relative shadow-lg max-w-4xl mx-auto bg-[url('https://www.transparenttextures.com/patterns/paper.png')]">
        
        {/* 다중 도장 레이어 */}
        <div className="absolute top-4 right-4 z-10 select-none pointer-events-none">
          {/* 기밀 등급 도장 */}
          <div className="border-4 border-red-600 text-red-600 p-2 transform rotate-12 opacity-70 font-black text-xl md:text-2xl font-mono uppercase mb-2">
            CONFIDENTIAL<br/>LEVEL 3
          </div>
          {/* 승인 도장 */}
          <div className="border-3 border-[#322659] text-[#322659] px-3 py-1 transform -rotate-6 opacity-60 font-bold text-sm font-mono mt-2">
            APPROVED<br/>
            <span className="text-xs">2023-11-██</span>
          </div>
        </div>

        {/* 문서 헤더 - 공문서 양식 */}
        <div className="border-4 border-double border-black mb-8">
          {/* 상단 문서 정보 바 */}
          <div className="bg-gray-200 border-b-2 border-black px-4 py-2 flex justify-between items-center text-xs font-mono">
            <span className="font-bold">문서번호: APMB-DOC-{selectedDoc.id}</span>
            <span className="text-gray-600">보안등급: TS (Top Secret)</span>
          </div>

          {/* 제목 영역 */}
          <div className="px-6 py-4 bg-white border-b border-gray-400">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1 font-mono tracking-wider">[ 사상체 명칭 ]</div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight text-[#322659] leading-tight">
                  {selectedDoc.name}
                </h1>
              </div>
              <div className="border-2 border-black bg-black text-white px-3 py-2 transform -rotate-2 shadow-md">
                <div className="text-[10px] opacity-70 mb-0.5">ID</div>
                <div className="font-mono text-base md:text-lg font-bold tracking-wider">
                  {selectedDoc.id}
                </div>
              </div>
            </div>
          </div>

          {/* 정보 테이블 - 공문서 스타일 */}
          <div className="bg-white">
            <table className="w-full text-sm border-collapse">
              <tbody>
                <tr className="border-b border-gray-400">
                  <td className="border-r-2 border-gray-400 bg-gray-100 px-4 py-3 w-32 font-bold text-gray-700 align-middle">
                    위험 등급
                  </td>
                  <td className="px-4 py-3 border-r border-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-3 h-3 bg-yellow-500 border border-yellow-700"></span>
                      <span className="font-bold text-base text-yellow-700">
                        {RISK_LEVELS[selectedDoc.risk]?.name}
                      </span>
                      <span className="text-xs text-gray-500 ml-1">({RISK_LEVELS[selectedDoc.risk]?.code})</span>
                    </div>
                  </td>
                  <td className="border-l-2 border-r-2 border-gray-400 bg-gray-100 px-4 py-3 w-32 font-bold text-gray-700 align-middle">
                    주요 변칙성
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-bold text-base font-mono">{selectedDoc.type}</span>
                  </td>
                </tr>
                <tr>
                  <td className="border-r-2 border-gray-400 bg-gray-100 px-4 py-2 font-bold text-gray-700 text-xs align-middle">
                    작성일자
                  </td>
                  <td className="px-4 py-2 text-xs font-mono text-gray-600 border-r border-gray-300">
                    2002-██-██
                  </td>
                  <td className="border-l-2 border-r-2 border-gray-400 bg-gray-100 px-4 py-2 font-bold text-gray-700 text-xs align-middle">
                    최종 갱신
                  </td>
                  <td className="px-4 py-2 text-xs font-mono text-gray-600">
                    2023-11-20
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 하단 경고 바 */}
          <div className="bg-[#322659] text-white px-4 py-1.5 text-[10px] font-mono flex items-center justify-between">
            <span>⚠ UNAUTHORIZED DISCLOSURE IS PROHIBITED</span>
            <span className="opacity-70">본 문서의 무단 유출은 엄격히 금지됨</span>
          </div>
        </div>

        {/* 문서 본문 (HTML 문자열 주입) */}
        <div 
          className={`prose max-w-none font-serif text-sm md:text-base leading-relaxed ${THEME.fontKr}`}
          dangerouslySetInnerHTML={{ __html: selectedDoc.content }}
        />

        {/* 문서 푸터 */}
        <div className="mt-16 pt-4 border-t border-dashed border-gray-400 text-xs text-gray-500 font-mono text-center flex flex-col gap-1">
          <span>문서 생성일: 2002-XX-XX | 최종 갱신: 2023-11-20</span>
          <span>작성자: 연구원 ███ | 승인: 관리국장 [데이터 말소]</span>
        </div>
      </div>

      {/* 목록으로 돌아가기 버튼 */}
      <div className="flex justify-center mt-8 mb-8">
        <button 
          onClick={() => navigate(`/anomalies/${riskId}`)} 
          className="text-[#322659] hover:bg-[#322659] hover:text-white px-4 py-2 border border-[#322659] transition-colors text-sm font-bold"
        >
          ← 목록으로
        </button>
      </div>
    </div>
  );
};

export default DocView;