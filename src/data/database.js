import { cardsDatabase } from './cardsDatabase';

// Função para gerar opções incorretas baseadas na categoria
const generateIncorrectOptions = (correctAnswer, category) => {
  const optionsByCategory = {
    'Glicólise': ['Frutose', 'Sacarose', 'Lactose', 'Maltose', 'Galactose', 'Piruvato', 'Fosfoenolpiruvato'],
    'Ciclo de Krebs': ['Piruvato', 'Lactato', 'Citrato', 'Succinato', 'Fumarato', 'Malato', 'Isocitrato'],
    'Cadeia Respiratória': ['ADP', 'AMP', 'GTP', 'NADH', 'FADH2', 'Complexo I', 'Complexo II'],
    'Gliconeogênese': ['Glicose', 'Frutose', 'Piruvato', 'Oxaloacetato', 'Fosfoenolpiruvato'],
    'Metabolismo Lipídico': ['Triglicerídeos', 'Fosfolipídios', 'Ácidos graxos', 'Acetil-CoA', 'Malonil-CoA'],
    'Metabolismo Proteico': ['Aminoácidos', 'Peptídeos', 'Proteínas', 'Ureia', 'Amônia'],
    'Regulação Metabólica': ['Insulina', 'Glucagon', 'Cortisol', 'Adrenalina', 'Hormônio do crescimento'],
    'Integração Metabólica': ['Fígado', 'Músculo', 'Tecido adiposo', 'Cérebro', 'Rim']
  };

  const categoryOptions = optionsByCategory[category] || ['Opção A', 'Opção B', 'Opção C'];
  const incorrectOptions = categoryOptions.filter(option => option !== correctAnswer);
  
  // Embaralhar e pegar 3 opções
  const shuffled = incorrectOptions.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
};

// Função para gerar pergunta baseada nas dicas
const generateQuestion = (card) => {
  const questionTemplates = [
    `Baseado nas características: "${card.dicas[0].texto}", qual é a resposta?`,
    `Qual substância/processo se encaixa na descrição: "${card.dicas[0].texto}"?`,
    `Considerando que "${card.dicas[0].texto}", estamos falando de:`,
    `Na categoria ${card.categoria}, o que "${card.dicas[0].texto}"?`,
  ];
  
  return questionTemplates[Math.floor(Math.random() * questionTemplates.length)];
};

// Função para converter a estrutura antiga para a nova
const convertCard = (oldCard) => {
  const incorrectOptions = generateIncorrectOptions(oldCard.resposta, oldCard.categoria);
  const allOptions = [oldCard.resposta, ...incorrectOptions];
  
  // Embaralhar as opções
  const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
  const correctAnswerIndex = shuffledOptions.indexOf(oldCard.resposta);

  return {
    id: parseInt(oldCard.id),
    question: generateQuestion(oldCard),
    options: shuffledOptions,
    correctAnswer: correctAnswerIndex,
    hints: oldCard.dicas.map(dica => dica.texto),
    explanation: oldCard.explicacao,
    category: oldCard.categoria.toLowerCase()
      .replace(/\s+/g, '_')
      .replace('ç', 'c')
      .replace('ã', 'a')
      .replace('õ', 'o')
  };
};

// Converter todas as cartas
export const cards = cardsDatabase.map(convertCard);

// Função para obter todas as categorias disponíveis
export const getCategories = () => {
  // Extrair categorias únicas das cartas
  const uniqueCategories = [...new Set(cardsDatabase.map(card => card.categoria))];
  
  return uniqueCategories.map(categoria => ({
    id: categoria.toLowerCase()
      .replace(/\s+/g, '_')
      .replace('ç', 'c')
      .replace('ã', 'a')
      .replace('õ', 'o'),
    name: categoria
  }));
};

// Função para obter cartas por categoria
export const getCardsByCategory = (categoryId) => {
  if (!categoryId) {
    return cards;
  }
  
  return cards.filter(card => card.category === categoryId);
};

// Função para embaralhar cartas
export const shuffleCards = (cardsArray) => {
  const shuffled = [...cardsArray];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Função para obter cartas aleatórias para duelo rápido
export const getRandomCards = (count = 10) => {
  const shuffled = shuffleCards(cards);
  return shuffled.slice(0, count);
};

// Função para obter todas as cartas
export const getAllCards = () => {
  return cards;
};