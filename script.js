document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  const textElements = Array.from(document.querySelectorAll('.interactive-text'));
  const finalMessage = document.querySelector('.final-message');
  const resetTrigger = document.querySelector('.reset-trigger');
  const textOverlay = document.querySelector('.text-overlay');

  let completedCount = 0;
  let gradientStart = 40; // 초기 시작 위치 (%)
  let gradientEnd = 60;   // 초기 끝 위치 (%)

  // 배열 셔플 함수
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // 텍스트 재배치 함수
  const rearrangeText = () => {
    const shuffledTexts = shuffleArray(textElements);

    // 기존 텍스트를 모두 제거하고 새로운 순서로 추가
    textOverlay.innerHTML = '';
    shuffledTexts.forEach((text) => {
      textOverlay.appendChild(text);
      text.classList.remove('blurred'); // 초기 상태로 복원
    });
  };

  // 텍스트 클릭 이벤트
  textElements.forEach((text) => {
    text.addEventListener('click', () => {
      text.classList.add('blurred');
      completedCount++;

      // 클릭할 때마다 그래디언트 확장
      gradientStart -= 5; // 왼쪽 확장
      gradientEnd += 5;   // 오른쪽 확장
      container.style.background = `linear-gradient(
        to right,
        rgba(255, 255, 255, 1) ${gradientStart}%,
        rgba(255, 0, 0, 0.5) 50%,
        rgba(255, 255, 255, 1) ${gradientEnd}%
      )`;

      // 모든 텍스트가 흐려지면 최종 메시지 표시
      if (completedCount === textElements.length) {
        setTimeout(() => {
          finalMessage.classList.add('visible');
        }, 1000); // 최종 메시지 딜레이
      }
    });
  });

  // "다른" 클릭 이벤트
  resetTrigger.addEventListener('click', () => {
    // 그래디언트 초기화
    gradientStart = 40;
    gradientEnd = 60;
    container.style.background = `linear-gradient(
      to right,
      rgba(255, 255, 255, 1) ${gradientStart}%,
      rgba(255, 0, 0, 0.5) 50%,
      rgba(255, 255, 255, 1) ${gradientEnd}%
    )`;

    // 최종 메시지 숨김
    finalMessage.classList.remove('visible');
    completedCount = 0;

    // 텍스트 재배치
    rearrangeText();
  });
});
