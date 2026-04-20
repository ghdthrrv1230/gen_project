const quizData = [
    {
        question: "다음 중 '중꺾마'의 올바른 의미는?",
        options: ["중요한 건 꺾이지 않는 마음", "중간에 꺾인 마음", "중독성 강한 꺾기 마술"],
        answer: "중요한 건 꺾이지 않는 마음",
        evidence: "2022년 롤드컵에서 유래되었으며, 최근 한국언론진흥재단 조사에서 가장 인지도가 높은 신조어로 꼽혔습니다."
    },
    {
        question: "신조어 '분조카'는 무엇의 줄임말일까요?",
        options: ["분노 조정 카페", "분위기 좋은 카페", "분식 조지는 카페"],
        answer: "분위기 좋은 카페",
        evidence: "인스타그램 등 SNS에서 장소 공유 시 자주 사용되는 단어입니다."
    }
];

let currentIdx = 0;
let score = 0;

// 2. 화면에 문제 렌더링
function showQuestion() {
    const q = quizData[currentIdx];
    document.getElementById("current-idx").innerText = currentIdx + 1;
    document.getElementById("total-idx").innerText = quizData.length;
    document.getElementById("question-text").innerText = q.question;
    document.getElementById("evidence-desc").innerText = q.evidence;

    const container = document.getElementById("options-container");
    container.innerHTML = ""; // 기존 버튼 초기화

    q.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(opt);
        container.appendChild(btn);
    });
}

// 3. 정답 확인 및 다음 단계
function checkAnswer(selected) {
    if (selected === quizData[currentIdx].answer) {
        score++;
    }
    
    currentIdx++;
    if (currentIdx < quizData.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");
    document.getElementById("score-text").innerText = 
        `${quizData.length}문제 중 ${score}문제를 맞혔습니다!`;
}

// 시작
showQuestion();