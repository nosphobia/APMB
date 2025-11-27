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
        
        {/* 기밀 등급 도장 */}
        <div className="absolute top-6 right-6 border-4 border-red-600 text-red-600 p-2 transform rotate-12 opacity-70 font-black text-2xl select-none pointer-events-none z-10 font-mono uppercase">
          CONFIDENTIAL<br/>LEVEL 3
        </div>

        {/* 문서 헤더 */}
        <div className="border-b-4 border-double border-black pb-4 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 gap-2">
            <h1 className="text-3xl md:text-4xl font-black font-sans tracking-tight text-[#322659]">
              {selectedDoc.name}
            </h1>
            <span className="font-mono text-lg md:text-xl font-bold bg-black text-white px-2">
              {selectedDoc.id}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm font-mono border-t border-black pt-4">
            <div className="flex flex-col">
              <span className="font-bold text-gray-500 text-xs">위험 등급</span>
              <span className="font-bold text-lg text-yellow-700">{RISK_LEVELS[selectedDoc.risk]?.name}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-500 text-xs">주요 변칙성 유형</span>
              <span className="font-bold text-lg">{selectedDoc.type}</span>
            </div>
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
      {/*
      <div className="flex justify-center mt-8 mb-8">
        <button 
          onClick={() => navigate('/anomalies')} 
          className="text-[#322659] hover:bg-[#322659] hover:text-white px-4 py-2 border border-[#322659] transition-colors text-sm font-bold"
        >
          ← 목록으로 돌아가기
        </button>
      </div> */}

      <button onClick={() => navigate(`/anomalies/${riskId}`)}> 
           ← 목록으로
      </button>
    </div>
  );
};

export default DocView;