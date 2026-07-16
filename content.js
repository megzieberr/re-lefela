// Re:Lefela content — Unit 1: Go dumedisa! (SECL121 study unit 1)
// Every item carries src = where the Setswana comes from (toolkit rule: no unsourced Setswana).
// audio: filename under audio/ (optional — engine skips listen/record exercises without it).
// cls: noun class number (enables concord-picker exercises).
// kind: 'phrase' | 'word' | 'verb' | 'rule'

const RL_CONTENT = {
  units: [
    {
      id: 'u1',
      title: 'Go dumedisa!',
      subtitle: 'Greetings — SECL121 Unit 1',
      lessons: [
        {
          id: 'u1l1', title: 'Dumela!', blurb: 'Your first words: hello, how are you, thank you.',
          audioTracks: [
            { file: 'lesson1-sounds.mp3', label: 'The sounds of Setswana (native speaker, 3½ min)', src: 'peace-corps-L1' },
            { file: 'lesson2-greetings.mp3', label: 'Greetings dialogue', src: 'peace-corps-L2' }
          ],
          items: [
            { id: 'u1l1-01', kind: 'phrase', tsw: 'Dumela rra', eng: 'Hello, sir', src: 'peace-corps-L2', note: '"Dumela" works any time of day. rra = sir.' },
            { id: 'u1l1-02', kind: 'phrase', tsw: 'Dumela mma', eng: 'Hello, madam', src: 'peace-corps-L2', note: 'mma = madam. You greet a woman with mma, a man with rra.' },
            { id: 'u1l1-03', kind: 'phrase', tsw: 'Dumelang borra le bomma', eng: 'Good day, ladies and gentlemen', src: 'peace-corps-L2', note: 'Dumela → Dumelang when greeting more than one person.' },
            { id: 'u1l1-04', kind: 'phrase', tsw: 'O tsogile jang?', eng: 'How are you?', src: 'peace-corps-L2', note: 'Literally "how have you risen?" — a morning-flavoured how-are-you.' },
            { id: 'u1l1-05', kind: 'phrase', tsw: 'Ke tsogile sentle', eng: 'I am well', src: 'peace-corps-L2', note: 'sentle = well/nicely. Lit. "I have risen well."' },
            { id: 'u1l1-06', kind: 'phrase', tsw: 'Le kae?', eng: 'How are you? (informal)', src: 'peace-corps-L2', note: 'Literally "where are you (all)?" — the casual greeting.' },
            { id: 'u1l1-07', kind: 'phrase', tsw: 'Ke teng', eng: 'I am fine', src: 'peace-corps-L2', note: 'teng = present/there. "I am around" = I\'m fine.' },
            { id: 'u1l1-08', kind: 'phrase', tsw: 'Re a leboga', eng: 'Thank you (we thank)', src: 'peace-corps-L2' },
            { id: 'u1l1-09', kind: 'phrase', tsw: 'Ke itumetse', eng: 'Thank you / I am glad', src: 'peace-corps-L6', note: 'From go itumela, to be happy.' },
            { id: 'u1l1-10', kind: 'word', tsw: 'Tsweetswee', eng: 'Please', src: 'peace-corps-L6' },
            { id: 'u1l1-11', kind: 'word', tsw: 'Ee', eng: 'Yes', src: 'peace-corps-L6' },
            { id: 'u1l1-12', kind: 'word', tsw: 'Nnyaa', eng: 'No', src: 'peace-corps-L6' }
          ]
        },
        {
          id: 'u1l2', title: 'Ke mang?', blurb: 'Introducing yourself: name, surname, where you\'re from.',
          audioTracks: [{ file: 'lesson3-intro.mp3', label: 'Introducing yourself (native speaker)', src: 'peace-corps-L3' }],
          items: [
            { id: 'u1l2-01', kind: 'phrase', tsw: 'Leina lame ke Megan', eng: 'My name is Megan', src: 'peace-corps-L3', note: 'leina = name (class 5), lame = my, ke = is.' },
            { id: 'u1l2-02', kind: 'phrase', tsw: 'Leina la gago ke mang?', eng: 'What is your name?', src: 'peace-corps-L3', note: 'mang = who — Setswana asks "your name is who?"' },
            { id: 'u1l2-03', kind: 'phrase', tsw: 'Sefane same ke Moeng', eng: 'My surname is Moeng', src: 'peace-corps-L3', note: 'sefane = surname (class 7).' },
            { id: 'u1l2-04', kind: 'phrase', tsw: 'O mang?', eng: 'Who are you?', src: 'peace-corps-L12' },
            { id: 'u1l2-05', kind: 'phrase', tsw: 'Ke tswa kwa Botswana', eng: 'I am from Botswana', src: 'peace-corps-L3', note: 'go tswa = to come from; kwa points to a place.' },
            { id: 'u1l2-06', kind: 'phrase', tsw: 'O tswa kae?', eng: 'Where are you from?', src: 'peace-corps-L3', note: 'kae = where.' },
            { id: 'u1l2-07', kind: 'phrase', tsw: 'A o tswa kwa Amerika?', eng: 'Are you from America?', src: 'peace-corps-L3', note: 'Starting a sentence with "A" turns it into a yes/no question.' },
            { id: 'u1l2-08', kind: 'phrase', tsw: 'Leina la gagwe ke Thabo', eng: 'His/her name is Thabo', src: 'peace-corps-L3', note: 'gago = your, gagwe = his/her.' },
            { id: 'u1l2-09', kind: 'phrase', tsw: 'Ke ithuta Setswana', eng: 'I am learning Setswana', src: 'peace-corps-L6', note: 'go ithuta = to learn. The sentence you\'ll say most this semester.' }
          ]
        },
        {
          id: 'u1l3', title: 'Go siame!', blurb: 'Saying goodbye without just walking off.',
          audioTracks: [{ file: 'lesson4-leaving.mp3', label: 'Leave-taking expressions (native speaker)', src: 'peace-corps-L4' }],
          items: [
            { id: 'u1l3-01', kind: 'phrase', tsw: 'Go siame', eng: 'Goodbye / OK, fine', src: 'peace-corps-L4', note: 'Lit. "it is fine" — doubles as "alright then" and "bye".' },
            { id: 'u1l3-02', kind: 'phrase', tsw: 'Ke tla go bona', eng: 'See you', src: 'peace-corps-L4', note: 'Lit. "I will see you" — tla marks the future.' },
            { id: 'u1l3-03', kind: 'phrase', tsw: 'Ke tla go bona kamoso', eng: 'See you tomorrow', src: 'peace-corps-L4', note: 'kamoso = tomorrow.' },
            { id: 'u1l3-04', kind: 'phrase', tsw: 'Ke tla go bona kgantele', eng: 'See you later', src: 'peace-corps-L4' },
            { id: 'u1l3-05', kind: 'phrase', tsw: 'Tlhola sentle', eng: 'Have a good day', src: 'peace-corps-L4', note: 'Lit. "spend the day well".' },
            { id: 'u1l3-06', kind: 'phrase', tsw: 'Robala sentle', eng: 'Good night (sleep well)', src: 'peace-corps-L4' },
            { id: 'u1l3-07', kind: 'word', tsw: 'Boroko', eng: 'Good night', src: 'peace-corps-L4', note: 'Short version — just "sleep".' },
            { id: 'u1l3-08', kind: 'word', tsw: 'Intshwarele', eng: 'Excuse me / forgive me', src: 'peace-corps-L6' },
            { id: 'u1l3-09', kind: 'phrase', tsw: 'Bua ka bonya', eng: 'Speak slowly', src: 'peace-corps-L6', note: 'Your survival phrase for the whole semester.' }
          ]
        },
        {
          id: 'u1l4', title: 'Nna le wena', blurb: 'Pronouns and the little words that drive every sentence.',
          audioTracks: [{ file: 'lesson8-pronouns.mp3', label: 'Pronouns (native speaker)', src: 'peace-corps-L8' }],
          items: [
            { id: 'u1l4-00', kind: 'rule', tsw: '', eng: '', src: 'grammar-toolkit', rule: 'Setswana sentences are driven by a little marker in front of the verb — the subject concord. ke = I, o = you, o = he/she, re = we, le = you all, ba = they. The full pronouns (nna, wena…) are optional emphasis; the concord is compulsory. Yes — re means "we". Re:Lefela = "we are (at) zero".' },
            { id: 'u1l4-01', kind: 'word', tsw: 'nna', eng: 'I / me', src: 'peace-corps-L8', note: 'Emphatic pronoun. The concord is ke: (nna) ke a bereka = I work.' },
            { id: 'u1l4-02', kind: 'word', tsw: 'wena', eng: 'you (one person)', src: 'peace-corps-L8', note: 'Concord: o.' },
            { id: 'u1l4-03', kind: 'word', tsw: 'ene', eng: 'he / she', src: 'peace-corps-L8', note: 'Concord: o (or a). Setswana has no he/she split — ene covers both.' },
            { id: 'u1l4-04', kind: 'word', tsw: 'rona', eng: 'we / us', src: 'peace-corps-L8', note: 'Concord: re.' },
            { id: 'u1l4-05', kind: 'word', tsw: 'lona', eng: 'you (a group)', src: 'peace-corps-L8', note: 'Concord: le (or lo).' },
            { id: 'u1l4-06', kind: 'word', tsw: 'bone', eng: 'they / them', src: 'peace-corps-L8', note: 'Concord: ba.' },
            { id: 'u1l4-07', kind: 'phrase', tsw: 'Ke a bala', eng: 'I am reading', src: 'peace-corps-L11', concordSlot: { answer: 'Ke', options: ['Ke', 'O', 'Re', 'Ba'], tail: 'a bala', hint: 'I' } },
            { id: 'u1l4-08', kind: 'phrase', tsw: 'Re a bala', eng: 'We are reading', src: 'peace-corps-L11', concordSlot: { answer: 'Re', options: ['Ke', 'O', 'Re', 'Ba'], tail: 'a bala', hint: 'we' } },
            { id: 'u1l4-09', kind: 'phrase', tsw: 'Ba a bala', eng: 'They are reading', src: 'peace-corps-L11', concordSlot: { answer: 'Ba', options: ['Ke', 'Le', 'Re', 'Ba'], tail: 'a bala', hint: 'they' } },
            { id: 'u1l4-10', kind: 'phrase', tsw: 'Ke na le buka', eng: 'I have a book', src: 'peace-corps-L11', note: 'na le = have (lit. "be with").' },
            { id: 'u1l4-11', kind: 'phrase', tsw: 'O na le buka', eng: 'You have a book', src: 'peace-corps-L11', concordSlot: { answer: 'O', options: ['Ke', 'O', 'Re', 'Ba'], tail: 'na le buka', hint: 'you (sg)' } }
          ]
        },
        {
          id: 'u1l5', title: 'Batho le dilo', blurb: 'Noun classes: why people are mo-/ba- and things are se-/di-.',
          items: [
            { id: 'u1l5-00', kind: 'rule', tsw: '', eng: '', src: 'grammar-toolkit', rule: 'Every Setswana noun belongs to a class, shown by its prefix — and singular/plural is a prefix swap, not an added -s. People: mo-/ba- (motho → batho). Things & languages: se-/di- (setilo → ditilo; Setswana itself is class se-!). Misc: le-/ma- (leina → maina). Animals and borrowed words: (n)-/di(n)- (ntlo → dintlo, buka → dibuka).' },
            { id: 'u1l5-01', kind: 'word', tsw: 'motho', eng: 'person', src: 'grammar-toolkit', cls: 1, plural: 'batho', note: 'mo- (person, singular) → ba- (plural): batho = people.' },
            { id: 'u1l5-02', kind: 'word', tsw: 'batho', eng: 'people', src: 'grammar-toolkit', cls: 2, note: 'Plural of motho.' },
            { id: 'u1l5-03', kind: 'word', tsw: 'Setswana', eng: 'the Setswana language', src: 'module-doc', cls: 7, note: 'se- marks languages and cultures: Setswana, Sekgoa (English)…' },
            { id: 'u1l5-04', kind: 'word', tsw: 'setilo', eng: 'chair', src: 'peace-corps-L7', cls: 7, plural: 'ditilo', note: 'se- → di-: ditilo = chairs.' },
            { id: 'u1l5-05', kind: 'word', tsw: 'buka', eng: 'book', src: 'peace-corps-L7', cls: 9, plural: 'dibuka' },
            { id: 'u1l5-06', kind: 'word', tsw: 'ntlo', eng: 'house', src: 'peace-corps-L18', cls: 9, plural: 'dintlo' },
            { id: 'u1l5-07', kind: 'word', tsw: 'leina', eng: 'name', src: 'peace-corps-L3', cls: 5, plural: 'maina', note: 'le- → ma-: maina = names.' },
            { id: 'u1l5-08', kind: 'word', tsw: 'lebati', eng: 'door', src: 'peace-corps-L7', cls: 5, plural: 'mabati' },
            { id: 'u1l5-09', kind: 'word', tsw: 'sekolo', eng: 'school', src: 'peace-corps-L18', cls: 7, plural: 'dikolo' },
            { id: 'u1l5-10', kind: 'word', tsw: 'lelapa', eng: 'family / home', src: 'peace-corps-L15', cls: 5 }
          ]
        },
        {
          id: 'u1l6', title: 'Ke a ja!', blurb: 'Verbs and your first real sentences.',
          items: [
            { id: 'u1l6-00', kind: 'rule', tsw: '', eng: '', src: 'grammar-toolkit', rule: 'Verbs are named with go: go ja = to eat, go nwa = to drink. To say a present-tense sentence: concord + a + verb when nothing follows (Ke a ja — I am eating), and drop the "a" when an object follows (Ke ja borotho — I eat bread).' },
            { id: 'u1l6-01', kind: 'verb', tsw: 'go ja', eng: 'to eat', src: 'peace-corps-L5' },
            { id: 'u1l6-02', kind: 'verb', tsw: 'go nwa', eng: 'to drink', src: 'peace-corps-L5' },
            { id: 'u1l6-03', kind: 'verb', tsw: 'go bua', eng: 'to speak', src: 'peace-corps-L5' },
            { id: 'u1l6-04', kind: 'verb', tsw: 'go ya', eng: 'to go', src: 'peace-corps-L5' },
            { id: 'u1l6-05', kind: 'verb', tsw: 'go batla', eng: 'to want', src: 'peace-corps-L5' },
            { id: 'u1l6-06', kind: 'verb', tsw: 'go reka', eng: 'to buy', src: 'peace-corps-L5' },
            { id: 'u1l6-07', kind: 'verb', tsw: 'go ithuta', eng: 'to learn / study', src: 'peace-corps-L5' },
            { id: 'u1l6-08', kind: 'phrase', tsw: 'Ke a ja', eng: 'I am eating', src: 'peace-corps-L6' },
            { id: 'u1l6-09', kind: 'phrase', tsw: 'Ke batla kofi', eng: 'I want coffee', src: 'peace-corps-L13', note: 'Object follows, so no "a": not "ke a batla kofi".' },
            { id: 'u1l6-10', kind: 'phrase', tsw: 'O ya kae?', eng: 'Where are you going?', src: 'peace-corps-L6' },
            { id: 'u1l6-11', kind: 'phrase', tsw: 'Ke ya lapeng', eng: 'I am going home', src: 'peace-corps-L6', note: 'lelapa (home) + -eng = lapeng, "to/at home".' },
            { id: 'u1l6-12', kind: 'phrase', tsw: 'Ke tlhoka madi', eng: 'I need money', src: 'peace-corps-L13', note: 'go tlhoka = to need; madi = money.' }
          ]
        },
        {
          id: 'u1l7', title: 'Ga ke itse!', blurb: 'Saying no: the negative present.',
          audioTracks: [{ file: 'lesson10-negation.mp3', label: 'Tenses & negation walkthrough (native speaker, 3½ min)', src: 'peace-corps-L10' }],
          items: [
            { id: 'u1l7-00', kind: 'rule', tsw: '', eng: '', src: 'peace-corps-L10', rule: 'Negative present = ga + concord + verb, and the verb\'s final -a becomes -e. Ke a batla (I want) → Ga ke batle (I don\'t want). Ke a ja → Ga ke je.' },
            { id: 'u1l7-01', kind: 'phrase', tsw: 'Ga ke batle', eng: 'I do not want', src: 'peace-corps-L10' },
            { id: 'u1l7-02', kind: 'phrase', tsw: 'Ga a je', eng: 'He/she does not eat', src: 'peace-corps-L6', note: 'Note the concord: o becomes a in the negative.' },
            { id: 'u1l7-03', kind: 'phrase', tsw: 'Ga ke rate kofi', eng: 'I don\'t like coffee', src: 'peace-corps-L6', note: 'go rata = to like/love; rata → rate.' },
            { id: 'u1l7-04', kind: 'phrase', tsw: 'Ga ke itse', eng: 'I do not know', src: 'peace-corps-L13', note: 'The most useful sentence in any language.' },
            { id: 'u1l7-05', kind: 'phrase', tsw: 'Ga ke tlhaloganye', eng: 'I don\'t understand', src: 'peace-corps-L6' },
            { id: 'u1l7-06', kind: 'phrase', tsw: 'Nnyaa, ga ke na mathata', eng: 'No, I don\'t have a problem', src: 'peace-corps-L6', note: 'ga ke na = I don\'t have.' },
            { id: 'u1l7-07', kind: 'phrase', tsw: 'Ga ke batle tee', eng: 'I don\'t want tea', src: 'peace-corps-L10+L14', note: 'Built from Ga ke batle + tee (both sourced).' },
            { id: 'u1l7-08', kind: 'phrase', tsw: 'Ga ba bue Sekgoa', eng: 'They don\'t speak English', src: 'peace-corps-L10+L5', note: 'Sekgoa = English. bua → bue in the negative.' }
          ]
        }
      ]
    }
  ],
  // Flavour text — every string sourced from the sentence bank
  flavour: {
    correct: ['Sentle!', 'Go siame!', 'Ee!'],
    wrong: ['Leka gape', 'Nnyaa…'],
    review: 'Gape!',
    greeting: 'Dumela',
    lessonDone: 'O dirile sentle',   // "you did well" — earned, end-of-lesson only
    streak: 'Letsatsi le letsatsi'   // "day by day"
  }
};
