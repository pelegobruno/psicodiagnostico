import React, { useState } from 'react';
import './App.css';

const feelings = [
  "Tristeza",
  "Ansiedade",
  "Raiva",
  "Estresse",
  "Culpa",
  "Medo",
  "Frustração",
  "Solidão",
  "Desesperança",
  "Tensão"
];

const questions = {
  Tristeza: [
    "Você tem se sentido desmotivado?",
    "Essa tristeza persiste há vários dias?",
    "Sente que está afetando seus relacionamentos?",
    "A tristeza está interferindo em sua rotina?"
  ],
  Ansiedade: [
    "Você sente desconforto em situações sociais?",
    "A ansiedade está impedindo suas atividades?",
    "Sente que evita certas situações por medo?",
    "A preocupação excessiva é uma constante?"
  ],
  Raiva: [
    "Você se sente irritado frequentemente?",
    "A raiva se intensifica em discussões?",
    "Ela afeta seus relacionamentos?",
    "Sente dificuldade em controlar a raiva?"
  ],
  Estresse: [
    "Você se sente sobrecarregado?",
    "O estresse causa problemas de sono?",
    "Está tendo dificuldades em cumprir prazos?",
    "Sente que o estresse afeta sua saúde?"
  ],
  Culpa: [
    "Você se sente culpado por não ajudar alguém?",
    "A culpa é uma constante em sua mente?",
    "Está se isolando por causa da culpa?",
    "Sente que não consegue perdoar a si mesmo?"
  ],
  Medo: [
    "Você sente medo ao enfrentar novas situações?",
    "O medo te impede de tentar coisas novas?",
    "Evita lugares ou pessoas que te causam medo?",
    "O medo interfere na sua vida?"
  ],
  Frustração: [
    "Você sente frustração ao não atingir seus objetivos?",
    "A frustração é uma emoção constante?",
    "Sente-se desapontado com seu progresso?",
    "A frustração afeta seu bem-estar?"
  ],
  Solidão: [
    "Você se sente sozinho mesmo em meio a outras pessoas?",
    "A solidão está afetando sua saúde mental?",
    "Sente que não tem com quem contar?",
    "A solidão interfere na sua felicidade?"
  ],
  Desesperança: [
    "Você sente que não há saída para suas dificuldades?",
    "Tem dificuldades para ver um futuro melhor?",
    "Sente uma falta de motivação para agir?",
    "A desesperança tem afetado sua vida diária?"
  ],
  Tensão: [
    "Você sente tensão muscular frequentemente?",
    "A tensão está afetando seu desempenho no trabalho?",
    "Sente que a tensão emocional está te consumindo?",
    "Dificuldade em relaxar é uma constante?"
  ]
};

const dsmDiagnostics = {
  Tristeza: {
    title: "Transtorno Depressivo Maior",
    description: "Caracteriza-se por humor deprimido persistente, perda de interesse ou prazer, insônia ou hipersonia, fadiga, sentimentos de inutilidade ou culpa e dificuldades de concentração.",
    treatment: "A psicoterapia, especialmente a Terapia Cognitivo-Comportamental (TCC) e a psicanálise, podem ser eficazes."
  },
  Ansiedade: {
    title: "Transtorno de Ansiedade Generalizada (TAG)",
    description: "Envolve preocupação excessiva e persistente sobre eventos diversos, acompanhada de sintomas físicos como tensão muscular e inquietação.",
    treatment: "O tratamento envolve TCC para controle da preocupação e técnicas de relaxamento."
  },
  Raiva: {
    title: "Transtorno Explosivo Intermitente",
    description: "Caracteriza-se por episódios recorrentes de explosões de raiva desproporcionais a situações de estresse, resultando em comportamentos agressivos.",
    treatment: "A terapia comportamental e técnicas de controle da raiva podem ser benéficas."
  },
  Estresse: {
    title: "Transtorno de Estresse Pós-Traumático (TEPT)",
    description: "Desencadeado por um evento traumático, inclui sintomas como reviver o trauma, evitação de lembranças e hipervigilância.",
    treatment: "Terapias como a TCC e a EMDR (dessensibilização e reprocessamento por movimento ocular) são recomendadas."
  },
  Culpa: {
    title: "Transtorno Obsessivo-Compulsivo (TOC)",
    description: "Caracteriza-se por pensamentos obsessivos recorrentes e comportamentos compulsivos que a pessoa sente que deve realizar.",
    treatment: "O tratamento pode incluir TCC focada em exposição e prevenção de resposta e medicação como inibidores seletivos da recaptação de serotonina (ISRS)."
  },
  Medo: {
    title: "Fobia Específica",
    description: "Consiste em um medo intenso e irracional de um objeto ou situação específica, levando a evitação extrema.",
    treatment: "A terapia de exposição é eficaz, permitindo que os pacientes enfrentem gradualmente seus medos."
  },
  Frustração: {
    title: "Transtorno da Personalidade Borderline",
    description: "Caracteriza-se por instabilidade nas relações interpessoais, autoimagem e emoções, além de comportamentos impulsivos.",
    treatment: "Tratamentos como a Terapia Comportamental Dialética (TCD) são frequentemente utilizados."
  },
  Solidão: {
    title: "Transtorno de Personalidade Evitativa",
    description: "Caracterizado por um padrão de inibição social, sentimentos de inadequação e hipersensibilidade à avaliação negativa.",
    treatment: "A terapia cognitivo-comportamental e a terapia de grupo podem ajudar a desenvolver habilidades sociais."
  },
  Desesperança: {
    title: "Transtorno Depressivo Persistente (Distimia)",
    description: "Uma forma crônica de depressão que dura pelo menos dois anos, com sintomas menos graves, mas que afetam a qualidade de vida.",
    treatment: "Tratamentos incluem psicoterapia e, em alguns casos, medicação antidepressiva."
  },
  Tensão: {
    title: "Transtorno de Ansiedade",
    description: "Caracteriza-se por uma preocupação constante e excessiva que pode interferir nas atividades diárias.",
    treatment: "O tratamento pode envolver terapia, medicação e técnicas de relaxamento."
  }
};

function App() {
  const [step, setStep] = useState(0);
  const [selectedFeeling, setSelectedFeeling] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [symptoms, setSymptoms] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFeelingSelect = (event) => {
    const feeling = event.target.value;
    setSelectedFeeling(feeling);
    setStep(1);
    setCurrentQuestionIndex(0);
    setSymptoms([]);
    setErrorMessage(''); // Limpa a mensagem de erro ao selecionar novo sentimento
  };

  const handleAnswer = (answer) => {
    if (answer === 'sim') setSymptoms((prev) => [...prev, selectedFeeling]);

    if (currentQuestionIndex + 1 < questions[selectedFeeling].length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStep(2);
    }
  };

  const handleContact = () => {
    const date = new Date(appointmentDate);
    const day = date.getDay();
    const hour = parseInt(appointmentTime.split(':')[0]);
    const minutes = parseInt(appointmentTime.split(':')[1]);

    // Valida se a data e o horário estão corretos
    if (day === 0 || day === 6) {
      setErrorMessage("Os atendimentos não podem ser agendados nos finais de semana (sábados e domingos).");
      return;
    }
    if (hour < 9 || hour >= 22) {
      setErrorMessage("Os atendimentos podem ser agendados apenas entre 09h e 22h.");
      return;
    }
    if (minutes !== 0) {
      setErrorMessage("Os atendimentos devem ser agendados em horários inteiros (sem minutos).");
      return;
    }

    const message = `Olá Bruno Costa, gostaria de agendar uma consulta no dia ${appointmentDate} às ${appointmentTime}.`;
    const whatsappLink = `https://wa.me/5551986875187?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };

  const renderFeelingSelector = () => (
    <div>
      <h2>Escolha um sentimento:</h2>
      <select onChange={handleFeelingSelect} value={selectedFeeling}>
        <option value="">Selecione um sentimento</option>
        {feelings.map((feeling) => (
          <option key={feeling} value={feeling}>
            {feeling}
          </option>
        ))}
      </select>
    </div>
  );

  const renderQuestions = () => {
    if (!selectedFeeling || !questions[selectedFeeling]) {
      return <p>Por favor, selecione um sentimento.</p>;
    }

    return (
      <div>
        <h2>{questions[selectedFeeling][currentQuestionIndex]}</h2>
        <button onClick={() => handleAnswer('sim')}>Sim</button>
        <button onClick={() => handleAnswer('não')}>Não</button>
      </div>
    );
  };

  const renderResults = () => {
    const uniqueSymptoms = [...new Set(symptoms)];
    return (
      <div>
        <h2>Resultado da Avaliação</h2>
        {uniqueSymptoms.length > 0 ? (
          <>
            <p>Sintomas identificados: <strong>{uniqueSymptoms.join(', ')}</strong></p>
            <h3>Diagnóstico Sugerido:</h3>
            <p><strong>{dsmDiagnostics[selectedFeeling]?.title}</strong></p>
            <p>{dsmDiagnostics[selectedFeeling]?.description}</p>
            <p><strong>Tratamento:</strong> {dsmDiagnostics[selectedFeeling]?.treatment}</p>
            <p>Para agendar um atendimento com Bruno Costa, por favor, escolha a data e o horário:</p>
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]} // Bloqueia datas passadas
            />
            <select
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
            >
              <option value="">Selecione um horário</option>
              {[...Array(14)].map((_, i) => (
                <option key={i} value={`${9 + i}:00`}>{`${9 + i}:00`}</option>
              ))}
            </select>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button onClick={handleContact}>Marcar Atendimento</button>
          </>
        ) : (
          <p>Nenhum sintoma significativo identificado.</p>
        )}
        <button onClick={() => setStep(0)}>Fazer outra avaliação</button>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Identifique Seus Sintomas</h1>
      {step === 0 && renderFeelingSelector()}
      {step === 1 && renderQuestions()}
      {step === 2 && renderResults()}
    </div>
  );
}

export default App;