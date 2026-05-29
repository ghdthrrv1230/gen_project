import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"; 
import {
  getDatabase,
  ref,
  push,
  onValue,
  query,
  limitToLast
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "xxx",
  authDomain: "genproject-e1477.firebaseapp.com",
  databaseURL: "https://genproject-e1477-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "genproject-e1477",
  storageBucket: "genproject-e1477.firebasestorage.app",
  messagingSenderId: "625627516292",
  appId: "1:625627516292:web:105023e6d7855a27e6a1d1",
  measurementId: "G-M5SZV1TWJV"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const commentsRef = query(ref(db, "comments"), limitToLast(100));

const tendencyData = [
  {
    question: "청년세대가 말한다. '지금은 열심히 해도 안정적으로 살 수 있을지 모르겠어요.' 나의 가장 가까운 반응은?",
    options: [
      { text: "예전 세대의 생존 중심 경험과 희생을 먼저 이해하고 다독이게 된다.", type: "A" },
      { text: "두 세대의 어려움은 종류가 다르니 단순 비교보다 사회 구조적 원인을 봐야 한다.", type: "B" },
      { text: "지금 세대가 느끼는 미래 불안과 예측 불가능성이 더 크게 와닿는다.", type: "C" },
      { text: "서로 어느 쪽이 더 힘들었는지 겨루고 깎아내리는 대화 방식 자체가 문제라고 느낀다.", type: "D" }
    ]
  },
  {
    question: "상사가 말한다. '원래 오래 일한 사람이 먼저 기회를 받는 거야.' 나의 가장 가까운 반응은?",
    options: [
      { text: "경험과 연차를 존중하는 조직의 기준과 질서도 필요하다고 본다.", type: "A" },
      { text: "기회 배분 기준은 누구나 납득할 수 있게 객관적으로 공개되어야 한다고 본다.", type: "B" },
      { text: "연차보다는 철저하게 개인의 실력과 실질적 기여도가 더 중요하다고 본다.", type: "C" },
      { text: "기준도 중요하지만, 이런 불만을 편하게 말할 수 있는 분위기가 있어야 한다고 본다.", type: "D" }
    ]
  },
  {
    question: "댓글창에 이런 말이 보인다. '요즘 애들은 이기적이다', '기성세대는 다 꼰대다.' 나의 반응은?",
    options: [
      { text: "과격한 표현이지만, 어느 정도 우리 사회의 씁쓸한 현실을 반영한다고 느낀다.", type: "A" },
      { text: "세대의 복잡한 배경을 지우고 상대를 단순화하여 평가하는 논리적 오류라 느낀다.", type: "B" },
      { text: "나라는 사람을 굳이 하나의 세대 프레임으로 묶어 판단하는 것 자체가 불편하다.", type: "C" },
      { text: "이런 공격적인 표현 방식이 서로의 마음을 닫게 하고 대화 자체를 어렵게 만든다.", type: "D" }
    ]
  },
  {
    question: "금요일 퇴근 직전, 상사가 '급한 건이 터졌으니 1시간만 돕고 가라'고 한다면?",
    options: [
      { text: "팀의 목표와 긴급 상황이므로 공동체적 책임감을 갖고 흔쾌히 남아서 돕는다.", type: "A" },
      { text: "왜 내가 남아야 하는지 합리적인 설명이나, 정당한 보상 절차가 있는지 확인한다.", type: "B" },
      { text: "퇴근 후의 내 개인적인 삶과 여가 시간이 중요하므로 공사 구분을 위해 정중히 거절한다.", type: "C" },
      { text: "어쩔 수 없는 상황은 이해하지만, 기분 상하지 않게 조심스럽게 부탁해줬으면 한다.", type: "D" }
    ]
  },
  {
    question: "팀장이 '이런 잡무는 원래 막내가 하는 거니까 네가 해'라고 지시할 때 내 생각은?",
    options: [
      { text: "막내로서 부서를 위해 헌신하고 조직에 적응해 나가는 자연스러운 과정이라 생각한다.", type: "A" },
      { text: "막내라는 이유로 떠넘기기보다, 직무 기술이나 매뉴얼에 기반한 명확한 기준이 필요하다.", type: "B" },
      { text: "나의 본래 업무 영역 외의 일을 강요받는 것은 내 독립성과 커리어 발전에 방해가 된다.", type: "C" },
      { text: "지시를 하더라도 막내의 수고를 인정해 주고 부드럽게 대화하는 태도가 필요하다.", type: "D" }
    ]
  },
  {
    question: "부서 단합을 위해 저녁 회식이 잡혔다. 이 상황을 대하는 나의 마음은?",
    options: [
      { text: "동료들과 친목을 다지고 부서의 유대감을 깊게 할 수 있는 필수적인 시간이다.", type: "A" },
      { text: "회식도 업무의 연장이라면, 일과 시간에 포함하거나 그에 합당한 보상이 있어야 한다.", type: "B" },
      { text: "내 소중한 개인 시간과 선택권을 강제로 침해받는 것 같아 부담스럽고 피하고 싶다.", type: "C" },
      { text: "회식을 하더라도 억지로 술을 권하지 않고, 서로 존중하며 편하게 대화하는 게 중요하다.", type: "D" }
    ]
  },
  {
    question: "받은 만큼만 일하겠다는 '조용한 퇴사' 트렌드에 대한 나의 솔직한 생각은?",
    options: [
      { text: "조직의 성장과 동료들의 업무에 부담을 넘기는 다소 이기적이고 무책임한 태도다.", type: "A" },
      { text: "근로 계약서에 명시된 만큼만 일하는 것이므로 절차와 논리상 아무 문제가 없다.", type: "B" },
      { text: "과도한 업무로부터 내 삶의 경계와 에너지를 지키기 위한 현명하고 독립적인 선택이다.", type: "C" },
      { text: "이런 현상이 퍼지기 전에 조직 내에서 서로의 불만을 터놓고 이야기할 수 있어야 한다.", type: "D" }
    ]
  },
  {
    question: "나와 가치관이 전혀 다른 세대와 장기 프로젝트를 진행하게 되었다면?",
    options: [
      { text: "팀 전체의 조화와 목표 달성을 위해 내가 조금 양보하고 맞춰주며 관계를 유지한다.", type: "A" },
      { text: "감정을 배제하고 명확한 업무 매뉴얼과 공정한 기준을 세워 철저하게 일을 나눈다.", type: "B" },
      { text: "각자의 역할과 책임 범위를 처음부터 명확히 그어 불필요한 간섭과 마찰을 차단한다.", type: "C" },
      { text: "시간이 걸리더라도 솔직한 대화를 통해 서로의 차이를 존중하고 이해하려 노력한다.", type: "D" }
    ]
  }
];

const knowledgeData = [
  {
    question: "최근 2030 세대에서 '결혼은 반드시 해야 한다'는 응답 비율이 급감하고 있습니다. 통계청 조사에서 나타난 가장 큰 현실적 이유는?",
    options: ["개인의 자유 지향", "결혼 자금 부족(경제적 이유)", "가사 노동에 대한 부담"],
    answer: "결혼 자금 부족(경제적 이유)",
    evidence: "통계청 조사에 따르면 주거비 상승 등 경제적 불안정이 결혼 기피의 가장 큰 원인으로 꼽히고 있습니다.",
    link: "https://kostat.go.kr/"
  },
  {
    question: "젊은 세대가 음성 통화보다 카카오톡 등 텍스트를 선호하는 '콜포비아'의 주된 심리적 배경은?",
    options: ["통화료에 대한 금전적 부담", "즉각적 응답에 대한 압박감", "단순히 말하는 것이 귀찮아서"],
    answer: "즉각적 응답에 대한 압박감",
    evidence: "비대면 소통에 익숙해진 세대는 생각할 시간이 없는 실시간 음성 피드백을 사회적 스트레스로 인식하는 경향이 큽니다.",
    link: "https://www.kisdi.re.kr/"
  },
  {
    question: "기성세대가 여전히 TV 뉴스나 포털을 신뢰하는 반면, Z세대가 새로운 트렌드를 탐색할 때 가장 많이 의존하는 플랫폼 형태는?",
    options: ["인터넷 카페 및 커뮤니티", "종이 신문 및 잡지", "유튜브 및 숏폼(알고리즘) 영상"],
    answer: "유튜브 및 숏폼(알고리즘) 영상",
    evidence: "디지털 네이티브 세대는 텍스트보다 영상과 해시태그 기반의 직관적인 자료를 통해 경험적 맥락을 탐색하는 것을 선호합니다.",
    link: "https://www.kpf.or.kr/"
  }
];

const tendencyGuideData = [
  { title: "🤝 책임·조화형", desc: "조직의 목표, 역할의 책임, 그리고 관계의 안정을 최우선으로 여깁니다. 개인보다 공동체의 헌신과 유대감을 중요하게 생각합니다." },
  { title: "⚖️ 공정·절차형", desc: "명확한 기준, 논리적인 설명, 납득 가능한 절차를 중시합니다. 투명한 정보 공개와 정당한 보상이 주어져야 움직입니다." },
  { title: "🛡️ 자율·경계형", desc: "개인의 시간과 선택권을 존중받길 원합니다. 독립성을 중시하며, 일과 삶의 경계(공사 구분)가 명확한 것을 선호합니다." },
  { title: "💬 관계·소통형", desc: "감정이 상하지 않는 상호 존중과 말하는 방식을 가장 중요하게 봅니다. 권위적인 태도보다는 솔직하고 부드러운 대화를 원합니다." }
];

const researchData = [
  { title: "경제 불안과 비혼화", desc: "청년 세대의 비혼화 및 경제관 변화는 단순 개인주의라기보다 고용 불안, 주거비 상승 등 고도 자본주의의 구조적 모순이 누적된 결과물입니다." },
  { title: "직장 내 가치관 충돌", desc: "야근 및 회식을 둘러싼 갈등의 정체는 기성세대의 '조직 헌신 모델'과 젊은 세대의 '합리적 거래·워라밸 모델'이 충돌하며 발생한 현상입니다." },
  { title: "미디어 및 언어 격차", desc: "포털·TV 의존 세대와 유튜브 숏폼·알고리즘 의존 세대가 소비하는 정보 풀(Pool)이 분리되며 상식의 뼈대 자체가 달라지는 확증 편향이 가속화됩니다." }
];

let currentMode = "";
let currentIdx = 0;
let scores = { A: 0, B: 0, C: 0, D: 0 };
let knowledgeScore = 0;

function renderStaticContent() {
  const guideContainer = document.getElementById("tendency-guide-container");
  if(guideContainer) {
    guideContainer.innerHTML = tendencyGuideData.map(item => `
      <div class="info-card">
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
      </div>
    `).join("");
  }

  const researchContainer = document.getElementById("research-data-container");
  if(researchContainer) {
    researchContainer.innerHTML = researchData.map(item => `
      <div class="research-block">
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
      </div>
    `).join("");
  }
}

function goHome() {
  const screens = ["quiz-screen", "explanation-screen", "result-screen", "knowledge-result-screen", "tendency-screen", "research-screen"];
  screens.forEach((s) => {
    const el = document.getElementById(s);
    if (el) el.classList.add("hidden");
  });
  document.getElementById("start-screen").classList.remove("hidden");
}

function showTendencies() {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("tendency-screen").classList.remove("hidden");
}

function showResearch() {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("research-screen").classList.remove("hidden");
}

function startTendencyTest() {
  currentMode = "tendency";
  currentIdx = 0;
  scores = { A: 0, B: 0, C: 0, D: 0 };
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("quiz-screen").classList.remove("hidden");
  showQuestion();
}

function startKnowledgeQuiz() {
  currentMode = "knowledge";
  currentIdx = 0;
  knowledgeScore = 0;
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("quiz-screen").classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const dataArray = currentMode === "tendency" ? tendencyData : knowledgeData;
  const q = dataArray[currentIdx];

  document.getElementById("current-idx").innerText = currentIdx + 1;
  document.getElementById("total-idx").innerText = dataArray.length;
  document.getElementById("question-text").innerText = q.question;

  const progressPercent = ((currentIdx + 1) / dataArray.length) * 100;
  document.getElementById("progress-bar").style.width = progressPercent + "%";

  const container = document.getElementById("options-container");
  container.innerHTML = "";

  const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);

  shuffledOptions.forEach((opt) => {
    const btn = document.createElement("button");
    if (currentMode === "tendency") {
      btn.innerText = opt.text;
      btn.onclick = () => {
        scores[opt.type]++;
        nextQuestion();
      };
    } else {
      btn.innerText = opt;
      btn.onclick = () => checkKnowledgeAnswer(opt);
    }
    container.appendChild(btn);
  });
}

function checkKnowledgeAnswer(selectedOpt) {
  const q = knowledgeData[currentIdx];
  const isCorrect = selectedOpt === q.answer;

  if (isCorrect) knowledgeScore++;

  const titleEl = document.getElementById("explanation-title");
  titleEl.innerText = isCorrect ? "⭕ 정답입니다!" : "❌ 아쉽네요!";
  titleEl.style.color = isCorrect ? "#8b5cf6" : "#ef4444";

  document.getElementById("explanation-desc").innerText = q.evidence;

  const sourceLink = document.getElementById("source-url");
  if (sourceLink) sourceLink.href = q.link;

  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("explanation-screen").classList.remove("hidden");
}

function nextQuestion() {
  currentIdx++;
  document.getElementById("explanation-screen").classList.add("hidden");

  const dataArray = currentMode === "tendency" ? tendencyData : knowledgeData;

  if (currentIdx < dataArray.length) {
    document.getElementById("quiz-screen").classList.remove("hidden");
    showQuestion();
  } else {
    if (currentMode === "tendency") showTendencyResult();
    else showKnowledgeResult();
  }
}

function showTendencyResult() {
  document.getElementById("quiz-screen").classList.add("hidden");
  const resultScreen = document.getElementById("result-screen");
  resultScreen.classList.remove("hidden");

  let maxScore = 0;
  let maxType = "A";
  
  for (const [type, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      maxType = type;
    }
  }

  let name = "", icon = "", desc = "", color = "";
  switch (maxType) {
    case "A":
      name = "책임·조화형"; icon = "🤝"; color = "#f59e0b";
      desc = "조직, 역할, 관계의 안정을 최우선으로 생각합니다. 세대 차이에서 오는 갈등보다 공동체로서의 책임감과 유대감을 중요하게 여기는 든든한 조율자입니다.";
      break;
    case "B":
      name = "공정·절차형"; icon = "⚖️"; color = "#3b82f6";
      desc = "명확한 기준, 논리적인 설명, 납득 가능한 절차를 중요하게 봅니다. 세대 갈등은 감정의 문제가 아니라, 불투명한 보상과 시스템의 문제라고 생각하는 합리적 분석가입니다.";
      break;
    case "C":
      name = "자율·경계형"; icon = "🛡️"; color = "#10b981";
      desc = "개인 시간, 선택권, 독립성을 가장 중요하게 여깁니다. 일과 삶의 경계(공사 구분)를 명확히 지키고자 하는 주체적인 개인주의자입니다.";
      break;
    case "D":
      name = "관계·소통형"; icon = "💬"; color = "#ec4899";
      desc = "감정 상함 방지와 상호 존중, 부드러운 대화 방식을 중요하게 봅니다. 어떻게 전달하느냐가 세대 갈등 해결의 핵심이라 믿는 공감형 리더입니다.";
      break;
  }

  const nameEl = document.getElementById("character-name");
  nameEl.innerText = name;
  nameEl.style.color = color;

  document.getElementById("character-icon").innerText = icon;
  document.getElementById("character-desc").innerText = desc;
}

function showKnowledgeResult() {
  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("knowledge-result-screen").classList.remove("hidden");

  document.getElementById("knowledge-score-text").innerText = `${knowledgeData.length}문제 중 ${knowledgeScore}문제 정답!`;

  let evalText = "";
  if (knowledgeScore === knowledgeData.length) evalText = "대단합니다! 당신은 진정한 세대 이해 마스터입니다.";
  else if (knowledgeScore > 0) evalText = "좋습니다! 상대 세대에 대한 배경 지식을 훌륭하게 갖춰가고 계시네요.";
  else evalText = "아쉽네요! 메인 화면의 '연구 배경'을 통해 배경 맥락을 조금 더 파악해보세요.";

  document.getElementById("knowledge-eval-text").innerText = evalText;
}

renderStaticContent();
loadComments();

function loadComments() {
  onValue(commentsRef, (snapshot) => {
    const data = snapshot.val() || {};
    const comments = Object.values(data).sort(
      (a, b) => (b.createdAt || 0) - (a.createdAt || 0)
    );
    renderComments(comments);
  });
}

function renderComments(comments = []) {
  const htmlContent = comments
    .map(
      (c) => `
      <div class="comment-item">
        <strong>
          ${escapeHtml(c.name)}
          <span class="comment-date">${formatDate(c.createdAt)}</span>
        </strong>
        <p class="comment-text">${escapeHtml(c.content)}</p>
      </div>
    `
    )
    .join("");

  const mainList = document.getElementById("main-comment-list");
  const resultList = document.getElementById("result-comment-list");

  if (mainList) mainList.innerHTML = htmlContent || "<p class='comment-text'>첫 번째 방명록을 남겨보세요!</p>";
  if (resultList) resultList.innerHTML = htmlContent || "<p class='comment-text'>첫 번째 댓글을 남겨보세요!</p>";
}

function addComment(viewPrefix) {
  const nameEl = document.getElementById(`${viewPrefix}-comment-name`);
  const contentEl = document.getElementById(`${viewPrefix}-comment-input`);

  if (!nameEl || !contentEl) return;

  const name = nameEl.value.trim();
  const content = contentEl.value.trim();

  if (!name || !content) {
    alert("이름과 내용을 모두 입력해주세요!");
    return;
  }

  const newComment = {
    name: name,
    content: content,
    createdAt: Date.now()
  };

  push(ref(db, "comments"), newComment)
    .then(() => {
      nameEl.value = "";
      contentEl.value = "";
    })
    .catch((error) => {
      console.error("댓글 저장 실패: ", error);
      alert("댓글 저장에 실패했습니다.");
    });
}

function formatDate(timestamp) {
  if (!timestamp) return "";
  return new Date(timestamp).toLocaleString("ko-KR");
}

function escapeHtml(str = "") {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

window.goHome = goHome;
window.showTendencies = showTendencies;
window.showResearch = showResearch;
window.startTendencyTest = startTendencyTest;
window.startKnowledgeQuiz = startKnowledgeQuiz;
window.nextQuestion = nextQuestion;
window.addComment = addComment;