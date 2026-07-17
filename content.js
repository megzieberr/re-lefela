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
            { id: 'u1l1-01', audio: 'items/u1l1-01.mp3', kind: 'phrase', tsw: 'Dumela rra', eng: 'Hello, sir', src: 'peace-corps-L2', note: '"Dumela" works any time of day. rra = sir.' },
            { id: 'u1l1-02', audio: 'items/u1l1-02.mp3', kind: 'phrase', tsw: 'Dumela mma', eng: 'Hello, madam', src: 'peace-corps-L2', note: 'mma = madam. You greet a woman with mma, a man with rra.' },
            { id: 'u1l1-03', audio: 'items/u1l1-03.mp3', kind: 'phrase', tsw: 'Dumelang borra le bomma', eng: 'Good day, ladies and gentlemen', src: 'peace-corps-L2', note: 'Dumela → Dumelang when greeting more than one person.' },
            { id: 'u1l1-04', audio: 'items/u1l1-04.mp3', kind: 'phrase', tsw: 'O tsogile jang?', eng: 'How are you?', src: 'peace-corps-L2', note: 'Literally "how have you risen?" — a morning-flavoured how-are-you.' },
            { id: 'u1l1-05', audio: 'items/u1l1-05.mp3', kind: 'phrase', tsw: 'Ke tsogile sentle', eng: 'I am well', src: 'peace-corps-L2', note: 'sentle = well/nicely. Lit. "I have risen well."' },
            { id: 'u1l1-13', audio: 'items/u1l1-13.mp3', kind: 'phrase', tsw: 'Ke tsogile sentle, wena o tsogile jang?', eng: 'I am well — and how are you?', src: 'peace-corps-L2', note: 'The natural reply chain: answer, then bounce the question back with wena (you).' },
            { id: 'u1l1-18', audio: 'items/u1l1-18.mp3', kind: 'phrase', tsw: 'Wena o tsogile jang?', eng: 'And how are you?', src: 'peace-corps-L2', note: 'wena = you (emphatic) — bounces the question back.' },
            { id: 'u1l1-14', audio: 'items/u1l1-14.mp3', kind: 'phrase', tsw: 'Le tsogile jang?', eng: 'How are you? (to a group)', src: 'peace-corps-L2', note: 'O → Le when asking more than one person.' },
            { id: 'u1l1-17', audio: 'items/u1l1-17.mp3', kind: 'phrase', tsw: 'Re tsogile sentle', eng: 'We are well', src: 'peace-corps-L2', note: 'The group answers with re (we).' },
            { id: 'u1l1-15', audio: 'items/u1l1-15.mp3', kind: 'phrase', tsw: 'Re tsogile sentle, wena o tsogile jang?', eng: 'We are well — and how are you?', src: 'peace-corps-L2', note: 'Answer for the group, then bounce the question back.' },
            { id: 'u1l1-06', audio: 'items/u1l1-06.mp3', kind: 'phrase', tsw: 'Le kae?', eng: 'How are you? (informal)', src: 'peace-corps-L2', note: 'Literally "where are you (all)?" — the casual greeting.' },
            { id: 'u1l1-07', kind: 'phrase', tsw: 'Ke teng', eng: 'I am fine', src: 'peace-corps-L2', note: 'teng = present/there. "I am around" = I\'m fine.' },
            { id: 'u1l1-16', audio: 'items/u1l1-16.mp3', kind: 'phrase', tsw: 'Re teng, a lona le teng?', eng: 'We are fine — are you all well?', src: 'peace-corps-L2', note: 'Informal reply to Le kae?. Lit. "we are there — are you (all) there?"' },
            { id: 'u1l1-20', audio: 'items/u1l1-20.mp3', kind: 'phrase', tsw: 'Re teng', eng: 'We are fine', src: 'peace-corps-L2', note: 'Ke teng = I\'m fine, Re teng = we\'re fine — same teng, different concord.' },
            { id: 'u1l1-08', kind: 'phrase', tsw: 'Re a leboga', eng: 'Thank you (we thank)', src: 'peace-corps-L2' },
            { id: 'u1l1-19', audio: 'items/u1l1-19.mp3', kind: 'phrase', tsw: 'Ke a leboga', eng: 'Thank you (I thank)', src: 'peace-corps-L2+beibele', note: 'ke = I, re = we — same thanks, different thanker.' },
            { id: 'u1l1-09', audio: 'items/u1l1-09.mp3', kind: 'phrase', tsw: 'Ke itumetse', eng: 'Thank you / I am glad', src: 'peace-corps-L6', note: 'From go itumela, to be happy.' },
            { id: 'u1l1-10', audio: 'items/u1l1-10.mp3', kind: 'word', tsw: 'Tsweetswee', eng: 'Please', src: 'peace-corps-L6' },
            { id: 'u1l1-11', audio: 'items/u1l1-11.mp3', kind: 'word', tsw: 'Ee', eng: 'Yes', src: 'peace-corps-L6' },
            { id: 'u1l1-12', audio: 'items/u1l1-12.mp3', kind: 'word', tsw: 'Nnyaa', eng: 'No', src: 'peace-corps-L6' }
          ]
        },
        {
          id: 'u1l2', title: 'Ke mang?', blurb: 'Introducing yourself: name, surname, where you\'re from.',
          audioTracks: [{ file: 'lesson3-intro.mp3', label: 'Introducing yourself (native speaker)', src: 'peace-corps-L3' }],
          items: [
            { id: 'u1l2-01', audio: 'items/u1l2-01.mp3', kind: 'phrase', tsw: 'Leina lame ke Itumeleng', eng: 'My name is Itumeleng', src: 'peace-corps-L3', note: 'leina = name (class 5), lame = my, ke = is. Swap in your own name — the frame is what matters.' },
            { id: 'u1l2-02', audio: 'items/u1l2-02.mp3', kind: 'phrase', tsw: 'Leina la gago ke mang?', eng: 'What is your name?', src: 'peace-corps-L3', note: 'mang = who — Setswana asks "your name is who?"' },
            { id: 'u1l2-03', audio: 'items/u1l2-03.mp3', kind: 'phrase', tsw: 'Sefane same ke Moeng', eng: 'My surname is Moeng', src: 'peace-corps-L3', note: 'sefane = surname (class 7).' },
            { id: 'u1l2-04', audio: 'items/u1l2-04.mp3', kind: 'phrase', tsw: 'O mang?', eng: 'Who are you?', src: 'peace-corps-L12' },
            { id: 'u1l2-05', kind: 'phrase', tsw: 'Ke tswa kwa Botswana', eng: 'I am from Botswana', src: 'peace-corps-L3', note: 'go tswa = to come from; kwa points to a place.' },
            { id: 'u1l2-10', audio: 'items/u1l2-10.mp3', kind: 'phrase', tsw: 'Ke tswa kwa…', eng: 'I am from…', src: 'peace-corps-L3', note: 'The frame — drop in any place: kwa Amerika, kwa Potchefstroom.' },
            { id: 'u1l2-06', audio: 'items/u1l2-06.mp3', kind: 'phrase', tsw: 'O tswa kae?', eng: 'Where are you from?', src: 'peace-corps-L3', note: 'kae = where.' },
            { id: 'u1l2-07', audio: 'items/u1l2-07.mp3', kind: 'phrase', tsw: 'A o tswa kwa Amerika?', eng: 'Are you from America?', src: 'peace-corps-L3', note: 'Starting a sentence with "A" turns it into a yes/no question.' },
            { id: 'u1l2-08', audio: 'items/u1l2-08.mp3', kind: 'phrase', tsw: 'Leina la gagwe ke Thabo', eng: 'His/her name is Thabo', src: 'peace-corps-L3', note: 'gago = your, gagwe = his/her.' },
            { id: 'u1l2-09', audio: 'items/u1l2-09.mp3', kind: 'phrase', tsw: 'Ke ithuta Setswana', eng: 'I am learning Setswana', src: 'peace-corps-L6', note: 'go ithuta = to learn. The sentence you\'ll say most this semester.' }
          ]
        },
        {
          id: 'u1l3', title: 'Go siame!', blurb: 'Saying goodbye without just walking off.',
          audioTracks: [{ file: 'lesson4-leaving.mp3', label: 'Leave-taking expressions (native speaker)', src: 'peace-corps-L4' }],
          items: [
            { id: 'u1l3-01', audio: 'items/u1l3-01.mp3', kind: 'phrase', tsw: 'Go siame', eng: 'Goodbye / OK, fine', src: 'peace-corps-L4', note: 'Lit. "it is fine" — doubles as "alright then" and "bye".' },
            { id: 'u1l3-02', audio: 'items/u1l3-02.mp3', kind: 'phrase', tsw: 'Ke tla go bona', eng: 'See you', src: 'peace-corps-L4', note: 'Lit. "I will see you" — tla marks the future.' },
            { id: 'u1l3-03', audio: 'items/u1l3-03.mp3', kind: 'phrase', tsw: 'Ke tla go bona kamoso', eng: 'See you tomorrow', src: 'peace-corps-L4', note: 'kamoso = tomorrow.' },
            { id: 'u1l3-04', audio: 'items/u1l3-04.mp3', kind: 'phrase', tsw: 'Ke tla go bona kgantele', eng: 'See you later', src: 'peace-corps-L4' },
            { id: 'u1l3-05', audio: 'items/u1l3-05.mp3', kind: 'phrase', tsw: 'Tlhola sentle', eng: 'Have a good day', src: 'peace-corps-L4', note: 'Lit. "spend the day well".' },
            { id: 'u1l3-06', audio: 'items/u1l3-06.mp3', kind: 'phrase', tsw: 'Robala sentle', eng: 'Good night (sleep well)', src: 'peace-corps-L4' },
            { id: 'u1l3-07', audio: 'items/u1l3-07.mp3', kind: 'word', tsw: 'Boroko', eng: 'Good night', src: 'peace-corps-L4', note: 'Short version — just "sleep".' },
            { id: 'u1l3-08', audio: 'items/u1l3-08.mp3', kind: 'word', tsw: 'Intshwarele', eng: 'Excuse me / forgive me', src: 'peace-corps-L6' },
            { id: 'u1l3-09', audio: 'items/u1l3-09.mp3', kind: 'phrase', tsw: 'Bua ka bonya', eng: 'Speak slowly', src: 'peace-corps-L6', note: 'Your survival phrase for the whole semester.' }
          ]
        },
        {
          id: 'u1l4', title: 'Nna le wena', blurb: 'Pronouns and the little words that drive every sentence.',
          audioTracks: [{ file: 'lesson8-pronouns.mp3', label: 'Pronouns (native speaker)', src: 'peace-corps-L8' }],
          items: [
            { id: 'u1l4-00', kind: 'rule', tsw: '', eng: '', src: 'grammar-toolkit', rule: 'Setswana sentences are driven by a little marker in front of the verb — the subject concord. ke = I, o = you, o = he/she, re = we, le = you all, ba = they. The full pronouns (nna, wena…) are optional emphasis; the concord is compulsory. Yes — re means "we". Re:Lefela = "we are (at) zero".' },
            { id: 'u1l4-01', audio: 'items/u1l4-01.mp3', kind: 'word', tsw: 'nna', eng: 'I / me', src: 'peace-corps-L8', note: 'Emphatic pronoun. The concord is ke: (nna) ke a bereka = I work.' },
            { id: 'u1l4-02', audio: 'items/u1l4-02.mp3', kind: 'word', tsw: 'wena', eng: 'you (one person)', src: 'peace-corps-L8', note: 'Concord: o.' },
            { id: 'u1l4-03', audio: 'items/u1l4-03.mp3', kind: 'word', tsw: 'ene', eng: 'he / she', src: 'peace-corps-L8', note: 'Concord: o (or a). Setswana has no he/she split — ene covers both.' },
            { id: 'u1l4-04', audio: 'items/u1l4-04.mp3', kind: 'word', tsw: 'rona', eng: 'we / us', src: 'peace-corps-L8', note: 'Concord: re.' },
            { id: 'u1l4-05', audio: 'items/u1l4-05.mp3', kind: 'word', tsw: 'lona', eng: 'you (a group)', src: 'peace-corps-L8', note: 'Concord: le (or lo).' },
            { id: 'u1l4-06', audio: 'items/u1l4-06.mp3', kind: 'word', tsw: 'bone', eng: 'they / them', src: 'peace-corps-L8', note: 'Concord: ba.' },
            { id: 'u1l4-07', audio: 'items/u1l4-07.mp3', kind: 'phrase', tsw: 'Ke a bala', eng: 'I am reading', src: 'peace-corps-L11', concordSlot: { answer: 'Ke', options: ['Ke', 'O', 'Re', 'Ba'], tail: 'a bala', hint: 'I' } },
            { id: 'u1l4-08', audio: 'items/u1l4-08.mp3', kind: 'phrase', tsw: 'Re a bala', eng: 'We are reading', src: 'peace-corps-L11', concordSlot: { answer: 'Re', options: ['Ke', 'O', 'Re', 'Ba'], tail: 'a bala', hint: 'we' } },
            { id: 'u1l4-09', audio: 'items/u1l4-09.mp3', kind: 'phrase', tsw: 'Ba a bala', eng: 'They are reading', src: 'peace-corps-L11', concordSlot: { answer: 'Ba', options: ['Ke', 'Le', 'Re', 'Ba'], tail: 'a bala', hint: 'they' } },
            { id: 'u1l4-10', audio: 'items/u1l4-10.mp3', kind: 'phrase', tsw: 'Ke na le buka', eng: 'I have a book', src: 'peace-corps-L11', note: 'na le = have (lit. "be with").' },
            { id: 'u1l4-11', audio: 'items/u1l4-11.mp3', kind: 'phrase', tsw: 'O na le buka', eng: 'You have a book', src: 'peace-corps-L11', concordSlot: { answer: 'O', options: ['Ke', 'O', 'Re', 'Ba'], tail: 'na le buka', hint: 'you (sg)' } },
            { id: 'u1l4-12', audio: 'items/u1l4-12.mp3', kind: 'phrase', tsw: 'O a bala', eng: 'You are reading / He-she is reading', src: 'peace-corps-L11', concordSlot: { answer: 'O', options: ['Ke', 'O', 'Lo', 'Ba'], tail: 'a bala', hint: 'you / he-she' }, note: 'One o for both — Setswana doesn\'t split "you" and "he/she" here. Context decides.' },
            { id: 'u1l4-13', audio: 'items/u1l4-13.mp3', kind: 'phrase', tsw: 'Lo a bala', eng: 'You are reading (a group)', src: 'peace-corps-L11', concordSlot: { answer: 'Lo', options: ['Ke', 'O', 'Lo', 'Re'], tail: 'a bala', hint: 'you all' }, note: 'The book\'s table uses lo for "you (pl)" here — le works too, as lona\'s card says.' }
          ]
        },
        {
          id: 'u1l5', title: 'Batho le dilo', blurb: 'Noun classes: why people are mo-/ba- and things are se-/di-.',
          items: [
            { id: 'u1l5-00', kind: 'rule', tsw: '', eng: '', src: 'grammar-toolkit', rule: 'Every Setswana noun belongs to a class, shown by its prefix — and singular/plural is a prefix swap, not an added -s. People: mo-/ba- (motho → batho). Things & languages: se-/di- (setilo → ditilo; Setswana itself is class se-!). Misc: le-/ma- (leina → maina). Animals and borrowed words: (n)-/di(n)- (ntlo → dintlo, buka → dibuka).' },
            { id: 'u1l5-01', kind: 'word', tsw: 'motho', eng: 'person', src: 'grammar-toolkit', cls: 1, plural: 'batho', note: 'mo- (person, singular) → ba- (plural): batho = people.' },
            { id: 'u1l5-02', kind: 'word', tsw: 'batho', eng: 'people', src: 'grammar-toolkit', cls: 2, note: 'Plural of motho.' },
            { id: 'u1l5-03', audio: 'items/u1l5-03.mp3', kind: 'word', tsw: 'Setswana', eng: 'the Setswana language', src: 'module-doc', cls: 7, note: 'se- marks languages and cultures: Setswana, Sekgoa (English)…' },
            { id: 'u1l5-04', audio: 'items/u1l5-04.mp3', kind: 'word', tsw: 'setilo', eng: 'chair', src: 'peace-corps-L7', cls: 7, plural: 'ditilo', note: 'se- → di-: ditilo = chairs.' },
            { id: 'u1l5-05', audio: 'items/u1l5-05.mp3', kind: 'word', tsw: 'buka', eng: 'book', src: 'peace-corps-L7', cls: 9, plural: 'dibuka' },
            { id: 'u1l5-06', audio: 'items/u1l5-06.mp3', kind: 'word', tsw: 'ntlo', eng: 'house', src: 'peace-corps-L18', cls: 9, plural: 'dintlo' },
            { id: 'u1l5-07', kind: 'word', tsw: 'leina', eng: 'name', src: 'peace-corps-L3', cls: 5, plural: 'maina', note: 'le- → ma-: maina = names.' },
            { id: 'u1l5-08', audio: 'items/u1l5-08.mp3', kind: 'word', tsw: 'lebati', eng: 'door', src: 'peace-corps-L7', cls: 5, plural: 'mabati' },
            { id: 'u1l5-09', audio: 'items/u1l5-09.mp3', kind: 'word', tsw: 'sekolo', eng: 'school', src: 'peace-corps-L18', cls: 7, plural: 'dikolo' },
            { id: 'u1l5-10', kind: 'word', tsw: 'lelapa', eng: 'family / home', src: 'peace-corps-L15', cls: 5 }
          ]
        },
        {
          id: 'u1l6', title: 'Ke a ja!', blurb: 'Verbs and your first real sentences.',
          items: [
            { id: 'u1l6-00', kind: 'rule', tsw: '', eng: '', src: 'grammar-toolkit', rule: 'Verbs are named with go: go ja = to eat, go nwa = to drink. To say a present-tense sentence: concord + a + verb when nothing follows (Ke a ja — I am eating), and drop the "a" when an object follows (Ke ja borotho — I eat bread).' },
            { id: 'u1l6-01', audio: 'items/u1l6-01.mp3', kind: 'verb', tsw: 'go ja', eng: 'to eat', src: 'peace-corps-L5' },
            { id: 'u1l6-02', audio: 'items/u1l6-02.mp3', kind: 'verb', tsw: 'go nwa', eng: 'to drink', src: 'peace-corps-L5' },
            { id: 'u1l6-03', audio: 'items/u1l6-03.mp3', kind: 'verb', tsw: 'go bua', eng: 'to speak', src: 'peace-corps-L5' },
            { id: 'u1l6-04', audio: 'items/u1l6-04.mp3', kind: 'verb', tsw: 'go ya', eng: 'to go', src: 'peace-corps-L5' },
            { id: 'u1l6-05', audio: 'items/u1l6-05.mp3', kind: 'verb', tsw: 'go batla', eng: 'to want', src: 'peace-corps-L5' },
            { id: 'u1l6-06', audio: 'items/u1l6-06.mp3', kind: 'verb', tsw: 'go reka', eng: 'to buy', src: 'peace-corps-L5' },
            { id: 'u1l6-07', audio: 'items/u1l6-07.mp3', kind: 'verb', tsw: 'go ithuta', eng: 'to learn / study', src: 'peace-corps-L5' },
            { id: 'u1l6-08', audio: 'items/u1l6-08.mp3', kind: 'phrase', tsw: 'Ke a ja', eng: 'I am eating', src: 'peace-corps-L6' },
            { id: 'u1l6-09', kind: 'phrase', tsw: 'Ke batla kofi', eng: 'I want coffee', src: 'peace-corps-L13', note: 'Object follows, so no "a": not "ke a batla kofi".' },
            { id: 'u1l6-10', audio: 'items/u1l6-10.mp3', kind: 'phrase', tsw: 'O ya kae?', eng: 'Where are you going?', src: 'peace-corps-L6' },
            { id: 'u1l6-11', audio: 'items/u1l6-11.mp3', kind: 'phrase', tsw: 'Ke ya lapeng', eng: 'I am going home', src: 'peace-corps-L6', note: 'lelapa (home) + -eng = lapeng, "to/at home".' },
            { id: 'u1l6-12', audio: 'items/u1l6-12.mp3', kind: 'phrase', tsw: 'Ke tlhoka madi', eng: 'I need money', src: 'peace-corps-L13', note: 'go tlhoka = to need; madi = money.' }
          ]
        },
        {
          id: 'u1l7', title: 'Ga ke itse!', blurb: 'Saying no: the negative present.',
          audioTracks: [{ file: 'lesson10-negation.mp3', label: 'Tenses & negation walkthrough (native speaker, 3½ min)', src: 'peace-corps-L10' }],
          items: [
            { id: 'u1l7-00', kind: 'rule', tsw: '', eng: '', src: 'peace-corps-L10', rule: 'Negative present = ga + concord + verb, and the verb\'s final -a becomes -e. Ke a batla (I want) → Ga ke batle (I don\'t want). Ke a ja → Ga ke je.' },
            { id: 'u1l7-01', audio: 'items/u1l7-01.mp3', kind: 'phrase', tsw: 'Ga ke batle', eng: 'I do not want', src: 'peace-corps-L10' },
            { id: 'u1l7-02', audio: 'items/u1l7-02.mp3', kind: 'phrase', tsw: 'Ga a je', eng: 'He/she does not eat', src: 'peace-corps-L6', note: 'Note the concord: o becomes a in the negative.' },
            { id: 'u1l7-03', audio: 'items/u1l7-03.mp3', kind: 'phrase', tsw: 'Ga ke rate kofi', eng: 'I don\'t like coffee', src: 'peace-corps-L6', note: 'go rata = to like/love; rata → rate.' },
            { id: 'u1l7-04', audio: 'items/u1l7-04.mp3', kind: 'phrase', tsw: 'Ga ke itse', eng: 'I do not know', src: 'peace-corps-L13', note: 'The most useful sentence in any language.' },
            { id: 'u1l7-05', audio: 'items/u1l7-05.mp3', kind: 'phrase', tsw: 'Ga ke tlhaloganye', eng: 'I don\'t understand', src: 'peace-corps-L6' },
            { id: 'u1l7-06', kind: 'phrase', tsw: 'Nnyaa, ga ke na mathata', eng: 'No, I don\'t have a problem', src: 'peace-corps-L6', note: 'ga ke na = I don\'t have.' },
            { id: 'u1l7-07', kind: 'phrase', tsw: 'Ga ke batle tee', eng: 'I don\'t want tea', src: 'peace-corps-L10+L14', note: 'Built from Ga ke batle + tee (both sourced).' },
            { id: 'u1l7-08', kind: 'phrase', tsw: 'Ga ba bue Sekgoa', eng: 'They don\'t speak English', src: 'peace-corps-L10+L5', note: 'Sekgoa = English. bua → bue in the negative.' }
          ]
        }
      ]
    },
    {
      id: 'u2',
      title: 'Mmele',
      subtitle: 'The body — SECL121 Unit 2',
      lessons: [
        {
          id: 'u2l1', title: 'Tlhogo ya me', blurb: 'The head and face — and the classes their names live in.',
          items: [
            { id: 'u2l1-00', kind: 'rule', tsw: '', eng: '', src: 'grammar-toolkit', rule: 'Body parts are a noun-class safari: head words scatter across the classes, so their plurals differ. le-/ma- (leitlho → matlho), se-/di- (sefatlhego → difatlhego), mo-/me- (molomo → melomo), 9/di- (tsebe → ditsebe). Watch the prefix — it tells you the plural AND the concord.' },
            { id: 'u2l1-01', kind: 'word', tsw: 'mmele', eng: 'body', src: 'beibele+nt-parallel', cls: 3, plural: 'mebele' },
            { id: 'u2l1-02', kind: 'word', tsw: 'tlhogo', eng: 'head', src: 'peace-corps-L22', cls: 9, plural: 'ditlhogo' },
            { id: 'u2l1-03', kind: 'word', tsw: 'sefatlhego', eng: 'face', src: 'beibele+nt-parallel', cls: 7, plural: 'difatlhego' },
            { id: 'u2l1-04', kind: 'word', tsw: 'moriri', eng: 'hair', src: 'beibele+nt-parallel', cls: 3, plural: 'meriri' },
            { id: 'u2l1-05', kind: 'word', tsw: 'leitlho', eng: 'eye', src: 'beibele+nt-parallel', cls: 5, plural: 'matlho', note: 'le- → ma-: matlho = eyes.' },
            { id: 'u2l1-06', kind: 'word', tsw: 'tsebe', eng: 'ear', src: 'beibele+nt-parallel', cls: 9, plural: 'ditsebe' },
            { id: 'u2l1-07', kind: 'word', tsw: 'nko', eng: 'nose', src: 'beibele', cls: 9, plural: 'dinko' },
            { id: 'u2l1-08', kind: 'word', tsw: 'molomo', eng: 'mouth', src: 'beibele+nt-parallel', cls: 3, plural: 'melomo' },
            { id: 'u2l1-09', kind: 'word', tsw: 'leino', eng: 'tooth', src: 'beibele', cls: 5, plural: 'meno', note: 'le- → ma-… almost: meno, not maino. Old class quirk.' },
            { id: 'u2l1-10', kind: 'word', tsw: 'loleme', eng: 'tongue', src: 'beibele+nt-parallel', cls: 11, plural: 'diteme', note: 'Class 11 lo-; plural jumps to di-: diteme.' },
            { id: 'u2l1-11', kind: 'word', tsw: 'molala', eng: 'neck', src: 'beibele', cls: 3, plural: 'melala' }
          ]
        },
        {
          id: 'u2l2', title: 'Diatla le dinao', blurb: 'Arms, hands, legs, feet — and the heart of it all.',
          items: [
            { id: 'u2l2-01', kind: 'word', tsw: 'letsogo', eng: 'arm / hand', src: 'beibele+nt-parallel', cls: 5, plural: 'mabogo', note: 'Irregular plural: mabogo, not matsogo.' },
            { id: 'u2l2-02', kind: 'word', tsw: 'seatla', eng: 'hand', src: 'beibele+nt-parallel', cls: 7, plural: 'diatla', note: 'The palm-and-fingers hand; letsogo is the whole arm.' },
            { id: 'u2l2-03', kind: 'word', tsw: 'monwana', eng: 'finger', src: 'beibele+nt-parallel', cls: 3, plural: 'menwana' },
            { id: 'u2l2-04', kind: 'word', tsw: 'mpa', eng: 'stomach / belly', src: 'beibele+nt-parallel', cls: 9, note: 'Careful: mpa is also a little word meaning "rather/merely". Context decides.' },
            { id: 'u2l2-05', kind: 'word', tsw: 'mala', eng: 'stomach / insides', src: 'peace-corps-L22', cls: 6, note: 'The word the Peace Corps health lesson uses: mala ame a botlhoko.' },
            { id: 'u2l2-06', kind: 'word', tsw: 'pelo', eng: 'heart', src: 'beibele+nt-parallel', cls: 9, plural: 'dipelo', note: 'Pelo-khutshwane, "short heart" = short-tempered. Setswana anatomy has opinions.' },
            { id: 'u2l2-07', kind: 'word', tsw: 'leoto', eng: 'leg', src: 'peace-corps-L22', cls: 5, plural: 'maoto' },
            { id: 'u2l2-08', kind: 'word', tsw: 'lonao', eng: 'foot', src: 'beibele', cls: 11, plural: 'dinao', note: 'You met dinao in Unit 1: Ema ka dinao — stand on your feet.' },
            { id: 'u2l2-09', audio: 'items/u2l2-09.mp3', kind: 'phrase', tsw: 'Ema ka dinao', eng: 'Stand up', src: 'peace-corps-L12', note: 'Lit. "stand on feet" — now you know why.' }
          ]
        },
        {
          id: 'u2l3', title: 'Dipotso', blurb: 'Question words: who, what, where, when, why, which.',
          audioTracks: [{ file: 'lesson12-questions.mp3', label: 'Questions & commands (native speaker)', src: 'peace-corps-L12' }],
          items: [
            { id: 'u2l3-00', kind: 'rule', tsw: '', eng: '', src: 'peace-corps-L12', rule: 'Question words sit where the answer would sit — no word-order gymnastics: O batla eng? = "You want WHAT?". And any statement becomes a yes/no question by putting A in front: A o tswa kwa Amerika? For "why", Setswana says go reng / ka go reng.' },
            { id: 'u2l3-01', audio: 'items/u2l3-01.mp3', kind: 'phrase', tsw: 'Ke eng?', eng: 'What is it?', src: 'peace-corps-L12', note: 'eng = what.' },
            { id: 'u2l3-02', audio: 'items/u2l3-02.mp3', kind: 'phrase', tsw: 'O tsile leng?', eng: 'When did you come?', src: 'peace-corps-L12', note: 'leng = when.' },
            { id: 'u2l3-03', audio: 'items/u2l3-03.mp3', kind: 'phrase', tsw: 'Go reng?', eng: 'Why?', src: 'peace-corps-L12', note: 'Also ka go reng — lit. "for saying what?"' },
            { id: 'u2l3-04', audio: 'items/u2l3-04.mp3', kind: 'phrase', tsw: 'O batla efe?', eng: 'Which one do you want?', src: 'peace-corps-L12', note: 'efe = which (one thing).' },
            { id: 'u2l3-05', audio: 'items/u2l3-05.mp3', kind: 'phrase', tsw: 'O batla dife?', eng: 'Which ones do you want?', src: 'peace-corps-L12', note: 'dife = which (plural).' },
            { id: 'u2l3-06', audio: 'items/u2l3-06.mp3', kind: 'phrase', tsw: 'O batla eng?', eng: 'What do you want?', src: 'peace-corps-L13' },
            { id: 'u2l3-07', audio: 'items/u2l3-07.mp3', kind: 'phrase', tsw: 'Ke bokae?', eng: 'How much is it?', src: 'peace-corps-L20', note: 'bokae = how much/many.' },
            { id: 'u2l3-08', audio: 'items/u2l3-08.mp3', kind: 'phrase', tsw: 'A o na le dipotso?', eng: 'Do you have any questions?', src: 'peace-corps-L6', note: 'A + statement = yes/no question. dipotso = questions.' },
            { id: 'u2l3-09', audio: 'items/u2l3-09.mp3', kind: 'phrase', tsw: 'O batla go dira eng jaanong?', eng: 'What do you want to do now?', src: 'peace-corps-L13', note: 'jaanong = now.' }
          ]
        },
        {
          id: 'u2l4', title: 'Ke ngaka!', blurb: 'Copulatives: saying what things ARE (and are not).',
          audioTracks: [{ file: 'lesson11-tobe.mp3', label: 'To be & to have (native speaker)', src: 'peace-corps-L11' }],
          items: [
            { id: 'u2l4-00', kind: 'rule', tsw: '', eng: '', src: 'pc-comp-grammar-ch2', rule: 'Setswana has no verb "to be" in the present — a tiny copula does the job. Talking ABOUT someone/something: ke (Mpho ke ngaka — Mpho is a doctor). Talking as I/you: your own subject marker IS the copula (Ke morutabana — I am a teacher; O morutabana — you are). Negative: ga se (Ga se ngaka — she is not a doctor).' },
            { id: 'u2l4-01', kind: 'word', tsw: 'ngaka', eng: 'doctor', src: 'pc-comp-grammar-ch7', cls: 9, plural: 'dingaka' },
            { id: 'u2l4-02', kind: 'word', tsw: 'morutabana', eng: 'teacher', src: 'nchlt+otlogetswe-2010', cls: 1, plural: 'barutabana', note: 'mo-/ba-, a person word — your job title, soon.' },
            { id: 'u2l4-03', kind: 'phrase', tsw: 'Mpho ke ngaka', eng: 'Mpho is a doctor', src: 'pc-comp-grammar-ch7', concordSlot: { head: 'Mpho', answer: 'ke', options: ['ke', 'o', 'ga se', 'ba'], tail: 'ngaka', hint: 'is (about someone else)' } },
            { id: 'u2l4-04', kind: 'phrase', tsw: 'Ke morutabana', eng: 'I am a teacher', src: 'pc-comp-grammar-ch2', note: 'That ke is the I-marker doing copula duty — not the same ke as in Mpho ke ngaka.' },
            { id: 'u2l4-05', kind: 'phrase', tsw: 'Ga se ngaka', eng: 'He/she is not a doctor', src: 'pc-comp-grammar-ch2', note: 'ga se = is not (identity).' },
            { id: 'u2l4-06', kind: 'phrase', tsw: 'Mpho o mo ntlong', eng: 'Mpho is in the house', src: 'pc-comp-grammar-ch7', note: 'Location: mo + noun + -ng. ntlo → mo ntlong.' },
            { id: 'u2l4-07', kind: 'phrase', tsw: 'Le ene ke moithaopi wa Peace Corps', eng: 'He too is a Peace Corps volunteer', src: 'pc-comp-grammar-dialogue', note: 'le ene = him/her too.' },
            { id: 'u2l4-08', kind: 'phrase', tsw: 'O na le bana ba le babedi', eng: 'He/she has two children', src: 'pc-comp-grammar-ch2', note: 'Counting people: ba le babedi — the concord counts along.' }
          ]
        },
        {
          id: 'u2l5', title: 'Mmele o montle', blurb: 'Adjectives & adverbs: describing what you see.',
          items: [
            { id: 'u2l5-00', kind: 'rule', tsw: '', eng: '', src: 'pc-comp-grammar-ch4', rule: 'Adjectives agree with their noun\'s class, like everything else. "The X is …" = subject marker + adjective: Mpho o montle (Mpho is beautiful), Dikgomo di bogale (the cows are fierce). Many adjectives repeat the class prefix: di-ntle, mo-golo, mo-nnye. Adverbs are easier — sentle (well) and thata (very/a lot) just follow the verb.' },
            { id: 'u2l5-01', kind: 'word', tsw: 'mogolo', eng: 'big / great / elder', src: 'beibele', note: 'You met it in ntate mogolo — grandfather, the "great father". Class 9 form: kgolo.' },
            { id: 'u2l5-02', kind: 'word', tsw: 'monnye', eng: 'small / young', src: 'beibele' },
            { id: 'u2l5-03', kind: 'word', tsw: 'moleele', eng: 'tall / long', src: 'beibele', note: 'Class 9 form: telele (tsela e telele — a long road).' },
            { id: 'u2l5-04', kind: 'word', tsw: 'khutshwane', eng: 'short', src: 'beibele' },
            { id: 'u2l5-05', kind: 'word', tsw: 'monate', eng: 'nice / tasty / sweet', src: 'beibele', note: 'Dijo di monate — the food is delicious. You will use this one.' },
            { id: 'u2l5-06', kind: 'phrase', tsw: 'Mpho o montle', eng: 'Mpho is beautiful', src: 'pc-comp-grammar-ch7' },
            { id: 'u2l5-07', kind: 'phrase', tsw: 'Dikgomo di bogale', eng: 'The cows are fierce', src: 'pc-comp-grammar-ch2', concordSlot: { head: 'Dikgomo', answer: 'di', options: ['di', 'ba', 'e', 'a'], tail: 'bogale', hint: 'cows — class 10' } },
            { id: 'u2l5-08', kind: 'phrase', tsw: 'Dikgomo di dintle', eng: 'The cows are beautiful', src: 'pc-comp-grammar-ch2', note: 'Weak adjective repeats the prefix: di + di-ntle.' },
            { id: 'u2l5-09', kind: 'phrase', tsw: 'Ke na le dikgomo tse dintle', eng: 'I have beautiful cows', src: 'pc-comp-grammar-ch4', note: 'Inside a phrase the adjective takes a linker: tse dintle.' },
            { id: 'u2l5-10', audio: 'items/u2l5-10.mp3', kind: 'word', tsw: 'dikgomo', eng: 'cows / cattle', src: 'pc-comp-grammar-ch2', cls: 10, note: 'Singular: kgomo. The grammar book\'s favourite example animal.' },
            { id: 'u2l5-11', kind: 'phrase', tsw: 'O opela sentle', eng: 'You sing well', src: 'pc-comp-grammar-adv', note: 'go opela = to sing; sentle after the verb = well.' },
            { id: 'u2l5-12', kind: 'phrase', tsw: 'Ke rata nama thata', eng: 'I like meat a lot', src: 'pc-comp-grammar-adv', note: 'thata = very / a lot; nama = meat.' }
          ]
        },
        {
          id: 'u2l6', title: 'Mebala', blurb: 'Colours — including the one word that is both green and blue.',
          items: [
            { id: 'u2l6-00', kind: 'rule', tsw: '', eng: '', src: 'davies-1992', rule: 'Setswana colour names wear the abstract bo- prefix: bontsho (black), bosweu (white), bohibidu (red). The famous one: botala covers BOTH green and blue — one colour to Setswana eyes. Need to split it? botala jwa tlhaga (grue of the grass = green) vs botala jwa legodimo (grue of the sky = blue). Describing a thing, the stem takes the noun\'s concord: pitse e tshweu — a white horse.' },
            { id: 'u2l6-01', kind: 'word', tsw: 'bontsho', eng: 'black', src: 'davies-1992' },
            { id: 'u2l6-02', kind: 'word', tsw: 'bosweu', eng: 'white', src: 'davies-1992' },
            { id: 'u2l6-03', kind: 'word', tsw: 'bohibidu', eng: 'red', src: 'davies-1992' },
            { id: 'u2l6-04', kind: 'word', tsw: 'botala', eng: 'green / blue', src: 'davies-1992', note: 'One word, two English colours — "grue". Linguists study Setswana for this.' },
            { id: 'u2l6-05', kind: 'phrase', tsw: 'botala jwa tlhaga', eng: 'green (grass-colour)', src: 'davies-1992' },
            { id: 'u2l6-06', kind: 'phrase', tsw: 'botala jwa legodimo', eng: 'blue (sky-colour)', src: 'davies-1992' },
            { id: 'u2l6-07', kind: 'word', tsw: 'bosetlha', eng: 'yellow', src: 'davies-1992' },
            { id: 'u2l6-08', kind: 'word', tsw: 'borokwa', eng: 'brown', src: 'davies-1992' },
            { id: 'u2l6-09', kind: 'word', tsw: 'selaole', eng: 'purple', src: 'davies-1992' },
            { id: 'u2l6-10', kind: 'phrase', tsw: 'Pitse e tshweu', eng: 'A white horse', src: 'beibele', concordSlot: { head: 'Pitse', answer: 'e', options: ['e', 'di', 'o', 'le'], tail: 'tshweu', hint: 'horse — class 9' }, note: '-sweu hardens to tshweu after class 9\'s hidden N. Straight out of Revelation 6.' },
            { id: 'u2l6-11', kind: 'phrase', tsw: 'Pitse e ntsho', eng: 'A black horse', src: 'beibele' },
            { id: 'u2l6-12', kind: 'phrase', tsw: 'Tlhale e khibidu', eng: 'A red thread', src: 'beibele', note: '-hibidu hardens to khibidu the same way.' },
            { id: 'u2l6-13', kind: 'word', tsw: 'ntsho', eng: 'black', src: 'davies-1992', note: 'Stem of bontsho — the bare form a noun\'s concord attaches to, as in Pitse e ntsho above.' },
            { id: 'u2l6-14', kind: 'word', tsw: 'sweu', eng: 'white', src: 'davies-1992', note: 'Stem of bosweu — hardens to tshweu after certain concords, as in Pitse e tshweu above.' },
            { id: 'u2l6-15', kind: 'word', tsw: 'khibidu', eng: 'red', src: 'davies-1992', note: 'Stem of bohibidu — hardens from -hibidu the same way as Tlhale e khibidu above.' },
            { id: 'u2l6-16', kind: 'word', tsw: 'tala', eng: 'green / blue', src: 'davies-1992', note: 'Stem of botala — still the same grue, just without the bo- prefix.' },
            { id: 'u2l6-17', kind: 'word', tsw: 'serolwana', eng: 'yellow', src: 'otlogetswe-rhyming-dict', note: 'A second, separate word for yellow — both serolwana and bosetlha are correct Setswana.' },
            { id: 'u2l6-18', kind: 'phrase', tsw: 'mmala wa loapi', eng: 'blue', src: 'native-recording', note: 'Literally "colour of the sky" — loapi = sky. A descriptive alternative to botala jwa legodimo.' },
            { id: 'u2l6-19', kind: 'phrase', tsw: 'mmala wa namune', eng: 'orange', src: 'native-recording', note: 'Literally "colour of an orange" — namune = orange (the fruit).' }
          ]
        },
        {
          id: 'u2l7', title: 'Kwa ngakeng', blurb: 'At the doctor: saying where it hurts.',
          audioTracks: [{ file: 'lesson22-health.mp3', label: 'Health expressions (native speaker)', src: 'peace-corps-L22' }],
          items: [
            { id: 'u2l7-00', kind: 'rule', tsw: '', eng: '', src: 'peace-corps-L22', rule: 'Pain grammar: [body part] + possessive + concord + botlhoko. Mala ame a botlhoko — my stomach hurts (mala is class 6, so its concord is a). Swap the body part and let the concord follow: matlho a gagwe a botlhoko — his/her eyes are sore. This is the whole unit in one pattern: body words + concords + an adjective.' },
            { id: 'u2l7-01', audio: 'items/u2l7-01.mp3', kind: 'phrase', tsw: 'O ikutlwa jang?', eng: 'How do you feel?', src: 'peace-corps-L13', note: 'go ikutlwa = to feel (yourself). The doctor\'s first question.' },
            { id: 'u2l7-02', audio: 'items/u2l7-02.mp3', kind: 'phrase', tsw: 'Ke a lwala', eng: 'I am sick', src: 'peace-corps-L22' },
            { id: 'u2l7-03', audio: 'items/u2l7-03.mp3', kind: 'phrase', tsw: 'Ga ke a tsoga', eng: 'I am not well', src: 'peace-corps-L22', note: 'Lit. "I have not risen" — the flip side of o tsogile jang?' },
            { id: 'u2l7-04', audio: 'items/u2l7-04.mp3', kind: 'phrase', tsw: 'Ke opiwa ke tlhogo', eng: 'I have a headache', src: 'peace-corps-L22', note: 'Lit. "I am being hit by the head".' },
            { id: 'u2l7-05', audio: 'items/u2l7-05.mp3', kind: 'phrase', tsw: 'Tlhogo yame e santse e opa', eng: 'My head still aches', src: 'peace-corps-L13', note: 'santse = still.' },
            { id: 'u2l7-06', audio: 'items/u2l7-06.mp3', kind: 'phrase', tsw: 'Mala ame a botlhoko', eng: 'My stomach hurts', src: 'peace-corps-L22', concordSlot: { head: 'Mala ame', answer: 'a', options: ['a', 'e', 'di', 'o'], tail: 'botlhoko', hint: 'mala — class 6' } },
            { id: 'u2l7-07', audio: 'items/u2l7-07.mp3', kind: 'phrase', tsw: 'Matlho a gagwe a botlhoko', eng: 'His/her eyes are sore', src: 'peace-corps-L22' },
            { id: 'u2l7-08', kind: 'word', tsw: 'botlhoko', eng: 'sore / painful', src: 'peace-corps-L22' },
            { id: 'u2l7-09', audio: 'items/u2l7-09.mp3', kind: 'phrase', tsw: 'O rurugile leoto', eng: 'His/her leg is swollen', src: 'peace-corps-L22', note: 'go ruruga = to swell.' },
            { id: 'u2l7-10', audio: 'items/u2l7-10.mp3', kind: 'phrase', tsw: 'O ile ngakeng', eng: 'He/she went to the doctor', src: 'peace-corps-L22', note: 'ngaka + -ng = ngakeng, "to the doctor\'s".' },
            { id: 'u2l7-11', audio: 'items/u2l7-11.mp3', kind: 'phrase', tsw: 'Ke kopa thuso', eng: 'I need help', src: 'peace-corps-L23', note: 'Lit. "I ask for help" — polite and useful everywhere.' }
          ]
        }
      ]
    },
    {
      id: 'u3',
      title: 'Go batla',
      subtitle: 'One verb through time — Peace Corps Lesson 10',
      lessons: [
        {
          id: 'u3l1', title: 'Ke a batla', blurb: 'Wanting, right now — and not wanting.',
          audioTracks: [{ file: 'lesson10-negation.mp3', label: 'Tenses & negation walkthrough (native speaker, 3½ min)', src: 'peace-corps-L10' }],
          items: [
            { id: 'u3l1-00', kind: 'rule', tsw: '', eng: '', src: 'peace-corps-L10', rule: 'One verb, six people — the concord does all the work: ke (I), o (you), o (she/he), re (we), le (you all), ba (they), each + a + batla. Yes, o is both "you" and "she/he"; context decides. To say no, put ga in front and the verb\'s last -a becomes -e: Ke a batla → Ga ke batle.' },
            { id: 'u3l1-01', audio: 'items/u3l1-01.mp3', kind: 'phrase', tsw: 'Ke a batla', eng: 'I want', src: 'peace-corps-L10', concordSlot: { answer: 'Ke', options: ['Ke', 'O', 'Re', 'Ba'], tail: 'a batla', hint: 'I' } },
            { id: 'u3l1-02', audio: 'items/u3l1-02.mp3', kind: 'phrase', tsw: 'O a batla', eng: 'You want / He-she wants', src: 'peace-corps-L10', concordSlot: { answer: 'O', options: ['Ke', 'O', 'Le', 'Ba'], tail: 'a batla', hint: 'you / he-she' }, note: 'The book prints this row twice — once for "you", once for "she/he". Same three words both times.' },
            { id: 'u3l1-03', audio: 'items/u3l1-03.mp3', kind: 'phrase', tsw: 'Re a batla', eng: 'We want', src: 'peace-corps-L10', concordSlot: { answer: 'Re', options: ['Ke', 'O', 'Re', 'Ba'], tail: 'a batla', hint: 'we' } },
            { id: 'u3l1-04', audio: 'items/u3l1-04.mp3', kind: 'phrase', tsw: 'Le a batla', eng: 'You want (a group)', src: 'peace-corps-L10', concordSlot: { answer: 'Le', options: ['Ke', 'O', 'Le', 'Ba'], tail: 'a batla', hint: 'you all' } },
            { id: 'u3l1-05', audio: 'items/u3l1-05.mp3', kind: 'phrase', tsw: 'Ba a batla', eng: 'They want', src: 'peace-corps-L10', concordSlot: { answer: 'Ba', options: ['Ke', 'Le', 'Re', 'Ba'], tail: 'a batla', hint: 'they' } },
            { id: 'u3l1-06', audio: 'items/u3l1-06.mp3', kind: 'phrase', tsw: 'Ga ke batle', eng: 'I do not want', src: 'peace-corps-L10', concordSlot: { head: 'Ga', answer: 'ke', options: ['ke', 'o', 're', 'ba'], tail: 'batle', hint: 'I' }, note: 'You meet this one again in Unit 1 lesson 7 — here it is as the first cell of the whole table.' },
            { id: 'u3l1-07', audio: 'items/u3l1-07.mp3', kind: 'phrase', tsw: 'Ga o batle', eng: 'You do not want', src: 'peace-corps-L10', concordSlot: { head: 'Ga', answer: 'o', options: ['ke', 'o', 're', 'ba'], tail: 'batle', hint: 'you' } },
            { id: 'u3l1-08', kind: 'phrase', tsw: 'Ga a batle', eng: 'She/he does not want', src: 'peace-corps-L10', concordSlot: { head: 'Ga', answer: 'a', options: ['ke', 'a', 're', 'ba'], tail: 'batle', hint: 'she/he' }, note: 'Here o finally splits: "you" stays o, but "she/he" becomes a in the negative.' },
            { id: 'u3l1-09', audio: 'items/u3l1-09.mp3', kind: 'phrase', tsw: 'Ga re batle', eng: 'We do not want', src: 'peace-corps-L10', concordSlot: { head: 'Ga', answer: 're', options: ['ke', 'o', 're', 'ba'], tail: 'batle', hint: 'we' } },
            { id: 'u3l1-10', audio: 'items/u3l1-10.mp3', kind: 'phrase', tsw: 'Ga le batle', eng: 'You do not want (a group)', src: 'peace-corps-L10', concordSlot: { head: 'Ga', answer: 'le', options: ['ke', 'le', 're', 'ba'], tail: 'batle', hint: 'you all' } },
            { id: 'u3l1-11', audio: 'items/u3l1-11.mp3', kind: 'phrase', tsw: 'Ga ba batle', eng: 'They do not want', src: 'peace-corps-L10', concordSlot: { head: 'Ga', answer: 'ba', options: ['ke', 'le', 're', 'ba'], tail: 'batle', hint: 'they' } }
          ]
        },
        {
          id: 'u3l2', title: 'Ke ne ke batla', blurb: 'Yesterday: what you did and didn\'t want.',
          items: [
            { id: 'u3l2-00', kind: 'rule', tsw: '', eng: '', src: 'peace-corps-L10', rule: 'The past says the concord TWICE, with ne in between: Ke ne ke batla — I wanted. The only trick is she/he, where the second one turns into a: O ne a batla. For "didn\'t", slip sa in before the verb and let -a become -e again: Ke ne ke sa batle.' },
            { id: 'u3l2-01', audio: 'items/u3l2-01.mp3', kind: 'phrase', tsw: 'Ke ne ke batla', eng: 'I wanted', src: 'peace-corps-L10', concordSlot: { head: 'Ke ne', answer: 'ke', options: ['ke', 'o', 're', 'ba'], tail: 'batla', hint: 'I — the second concord' } },
            { id: 'u3l2-02', audio: 'items/u3l2-02.mp3', kind: 'phrase', tsw: 'O ne o batla', eng: 'You wanted', src: 'peace-corps-L10', concordSlot: { head: 'O ne', answer: 'o', options: ['ke', 'o', 'a', 're'], tail: 'batla', hint: 'you — the second concord' } },
            { id: 'u3l2-03', audio: 'items/u3l2-03.mp3', kind: 'phrase', tsw: 'O ne a batla', eng: 'She/he wanted', src: 'peace-corps-L10', concordSlot: { head: 'O ne', answer: 'a', options: ['ke', 'o', 'a', 're'], tail: 'batla', hint: 'she/he — the second concord' }, note: 'Same opening as "You wanted" — the second concord is the only thing that tells them apart.' },
            { id: 'u3l2-04', kind: 'phrase', tsw: 'Re ne re batla', eng: 'We wanted', src: 'peace-corps-L10', concordSlot: { head: 'Re ne', answer: 're', options: ['ke', 'o', 're', 'ba'], tail: 'batla', hint: 'we — the second concord' } },
            { id: 'u3l2-05', audio: 'items/u3l2-05.mp3', kind: 'phrase', tsw: 'Le ne le batla', eng: 'You wanted (a group)', src: 'peace-corps-L10', concordSlot: { head: 'Le ne', answer: 'le', options: ['ke', 'le', 're', 'ba'], tail: 'batla', hint: 'you all — the second concord' } },
            { id: 'u3l2-06', audio: 'items/u3l2-06.mp3', kind: 'phrase', tsw: 'Ba ne ba batla', eng: 'They wanted', src: 'peace-corps-L10', concordSlot: { head: 'Ba ne', answer: 'ba', options: ['ke', 'le', 're', 'ba'], tail: 'batla', hint: 'they — the second concord' } },
            { id: 'u3l2-07', audio: 'items/u3l2-07.mp3', kind: 'phrase', tsw: 'Ke ne ke sa batle', eng: 'I did not want', src: 'peace-corps-L10', concordSlot: { head: 'Ke ne ke', answer: 'sa', options: ['sa', 'ga', 'a', 'ne'], tail: 'batle', hint: 'the "not" of the past' } },
            { id: 'u3l2-08', audio: 'items/u3l2-08.mp3', kind: 'phrase', tsw: 'O ne o sa batle', eng: 'You did not want', src: 'peace-corps-L10' },
            { id: 'u3l2-09', audio: 'items/u3l2-09.mp3', kind: 'phrase', tsw: 'O ne a sa batle', eng: 'She/he did not want', src: 'peace-corps-L10' },
            { id: 'u3l2-10', audio: 'items/u3l2-10.mp3', kind: 'phrase', tsw: 'Re ne re sa batle', eng: 'We did not want', src: 'peace-corps-L10' },
            { id: 'u3l2-11', audio: 'items/u3l2-11.mp3', kind: 'phrase', tsw: 'Le ne le sa batle', eng: 'You did not want (a group)', src: 'peace-corps-L10' },
            { id: 'u3l2-12', audio: 'items/u3l2-12.mp3', kind: 'phrase', tsw: 'Ba ne ba sa batle', eng: 'They did not want', src: 'peace-corps-L10' }
          ]
        },
        {
          id: 'u3l3', title: 'Ke tla batla', blurb: 'Tomorrow: the easiest tense and the strangest one.',
          items: [
            { id: 'u3l3-00', kind: 'rule', tsw: '', eng: '', src: 'peace-corps-L10', rule: 'The future is the kind one: concord + tla + verb. Ke tla batla — I will want. Its negative is the strangest cell in the table: ga + concord + kake + a SECOND, changed concord + batla. Ga ke kake ka batla. Watch the swap: ke→ka, o→wa, re→ra, le→la; a and ba keep their shape.' },
            { id: 'u3l3-01', audio: 'items/u3l3-01.mp3', kind: 'phrase', tsw: 'Ke tla batla', eng: 'I will want', src: 'peace-corps-L10', concordSlot: { answer: 'Ke', options: ['Ke', 'O', 'Re', 'Ba'], tail: 'tla batla', hint: 'I' }, note: 'tla marks the future — the same tla as Ke tla go bona, "see you".' },
            { id: 'u3l3-02', audio: 'items/u3l3-02.mp3', kind: 'phrase', tsw: 'O tla batla', eng: 'You will want / He-she will want', src: 'peace-corps-L10', concordSlot: { answer: 'O', options: ['Ke', 'O', 'Le', 'Ba'], tail: 'tla batla', hint: 'you / he-she' }, note: 'Like the present, one form covers both.' },
            { id: 'u3l3-03', audio: 'items/u3l3-03.mp3', kind: 'phrase', tsw: 'Re tla batla', eng: 'We will want', src: 'peace-corps-L10', concordSlot: { answer: 'Re', options: ['Ke', 'O', 'Re', 'Ba'], tail: 'tla batla', hint: 'we' } },
            { id: 'u3l3-04', audio: 'items/u3l3-04.mp3', kind: 'phrase', tsw: 'Le tla batla', eng: 'You will want (a group)', src: 'peace-corps-L10', concordSlot: { answer: 'Le', options: ['Ke', 'O', 'Le', 'Ba'], tail: 'tla batla', hint: 'you all' } },
            { id: 'u3l3-05', audio: 'items/u3l3-05.mp3', kind: 'phrase', tsw: 'Ba tla batla', eng: 'They will want', src: 'peace-corps-L10', concordSlot: { answer: 'Ba', options: ['Ke', 'Le', 'Re', 'Ba'], tail: 'tla batla', hint: 'they' } },
            { id: 'u3l3-06', audio: 'items/u3l3-06.mp3', kind: 'phrase', tsw: 'Ga ke kake ka batla', eng: 'I will not want', src: 'peace-corps-L10', concordSlot: { head: 'Ga ke kake', answer: 'ka', options: ['ka', 'wa', 'ra', 'la'], tail: 'batla', hint: 'I — the changed second concord' } },
            { id: 'u3l3-07', audio: 'items/u3l3-07.mp3', kind: 'phrase', tsw: 'Ga o kake wa batla', eng: 'You will not want', src: 'peace-corps-L10', concordSlot: { head: 'Ga o kake', answer: 'wa', options: ['ka', 'wa', 'ra', 'la'], tail: 'batla', hint: 'you — the changed second concord' } },
            { id: 'u3l3-08', kind: 'phrase', tsw: 'Ga a kake a batla', eng: 'She/he will not want', src: 'peace-corps-L10', concordSlot: { head: 'Ga a kake', answer: 'a', options: ['a', 'wa', 'ra', 'la'], tail: 'batla', hint: 'she/he — the changed second concord' }, note: 'she/he is the lazy one: a stays a.' },
            { id: 'u3l3-09', audio: 'items/u3l3-09.mp3', kind: 'phrase', tsw: 'Ga re kake ra batla', eng: 'We will not want', src: 'peace-corps-L10', concordSlot: { head: 'Ga re kake', answer: 'ra', options: ['ka', 'wa', 'ra', 'la'], tail: 'batla', hint: 'we — the changed second concord' } },
            { id: 'u3l3-10', audio: 'items/u3l3-10.mp3', kind: 'phrase', tsw: 'Ga le kake la batla', eng: 'You will not want (a group)', src: 'peace-corps-L10', concordSlot: { head: 'Ga le kake', answer: 'la', options: ['ka', 'wa', 'ra', 'la'], tail: 'batla', hint: 'you all — the changed second concord' } },
            { id: 'u3l3-11', audio: 'items/u3l3-11.mp3', kind: 'phrase', tsw: 'Ga ba kake ba batla', eng: 'They will not want', src: 'peace-corps-L10', concordSlot: { head: 'Ga ba kake', answer: 'ba', options: ['ba', 'wa', 'ra', 'la'], tail: 'batla', hint: 'they — the changed second concord' }, note: 'they is lazy too: ba stays ba.' }
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

// Listening gym — NCHLT Setswana speech corpus (SADiLaR, CC BY 3.0): real native speakers,
// clips filtered so every word is already-taught vocabulary (toolkit/nchlt-filter.py).
RL_CONTENT.nchlt = [
  {id: 'nchlt_tsn_150f_0511', tsw: 'eng mang jang kae leng', audio: 'nchlt/nchlt_tsn_150f_0511.mp3', spk: '150 (female, -1, gauteng)'},
  {id: 'nchlt_tsn_177m_0531', tsw: 'mang eng kae leng jang', audio: 'nchlt/nchlt_tsn_177m_0531.mp3', spk: '177 (male, -1, gauteng)'},
  {id: 'nchlt_tsn_066f_0494', tsw: 'motho thata ya go reka', audio: 'nchlt/nchlt_tsn_066f_0494.mp3', spk: '066 (female, 19, gauteng)'},
  {id: 'nchlt_tsn_090f_0573', tsw: 'leina la gago le a', audio: 'nchlt/nchlt_tsn_090f_0573.mp3', spk: '090 (female, -1, gauteng)'},
  {id: 'nchlt_tsn_072m_0329', tsw: 'e ka nna ya dira', audio: 'nchlt/nchlt_tsn_072m_0329.mp3', spk: '072 (male, 18, gauteng)'},
  {id: 'nchlt_tsn_064f_0217', tsw: 'a ka nna a kopa', audio: 'nchlt/nchlt_tsn_064f_0217.mp3', spk: '064 (female, 17, gauteng)'},
  {id: 'nchlt_tsn_168f_0577', tsw: 're tla tsoga re bona', audio: 'nchlt/nchlt_tsn_168f_0577.mp3', spk: '168 (female, -1, gauteng)'},
  {id: 'nchlt_tsn_165m_0195', tsw: 'o ka nna wa dira', audio: 'nchlt/nchlt_tsn_165m_0195.mp3', spk: '165 (male, -1, gauteng)'},
  {id: 'nchlt_tsn_151f_0322', tsw: 'wa rona ke batho ba', audio: 'nchlt/nchlt_tsn_151f_0322.mp3', spk: '151 (female, -1, gauteng)'},
  {id: 'nchlt_tsn_113f_0194', tsw: 'maina a batho ba ba', audio: 'nchlt/nchlt_tsn_113f_0194.mp3', spk: '113 (female, -1, gauteng)'},
  {id: 'nchlt_tsn_016m_0331', tsw: 'batho ba le babedi ba', audio: 'nchlt/nchlt_tsn_016m_0331.mp3', spk: '016 (male, 25, north west)'},
  {id: 'nchlt_tsn_066f_0415', tsw: 'e e leng teng mo', audio: 'nchlt/nchlt_tsn_066f_0415.mp3', spk: '066 (female, 19, gauteng)'},
  {id: 'nchlt_tsn_089f_0395', tsw: 'ya thata ya go dira', audio: 'nchlt/nchlt_tsn_089f_0395.mp3', spk: '089 (female, 31, gauteng)'},
  {id: 'nchlt_tsn_086f_0460', tsw: 'teng ga madi se se', audio: 'nchlt/nchlt_tsn_086f_0460.mp3', spk: '086 (female, 33, gauteng)'},
  {id: 'nchlt_tsn_094m_0275', tsw: 'ya madi go tswa go', audio: 'nchlt/nchlt_tsn_094m_0275.mp3', spk: '094 (male, 21, gauteng)'},
  {id: 'nchlt_tsn_186f_0178', tsw: 're batla thuso re tla', audio: 'nchlt/nchlt_tsn_186f_0178.mp3', spk: '186 (female, -1, gauteng)'},
  {id: 'nchlt_tsn_089f_0088', tsw: 'go tswa kwa ngakeng ya', audio: 'nchlt/nchlt_tsn_089f_0088.mp3', spk: '089 (female, 31, gauteng)'},
  {id: 'nchlt_tsn_023f_0240', tsw: 'go tla tswa mo go', audio: 'nchlt/nchlt_tsn_023f_0240.mp3', spk: '023 (female, 25, north west)'},
  {id: 'nchlt_tsn_023f_0886', tsw: 'o na le madi a', audio: 'nchlt/nchlt_tsn_023f_0886.mp3', spk: '023 (female, 25, north west)'},
  {id: 'nchlt_tsn_131f_0575', tsw: 'setswana', audio: 'nchlt/nchlt_tsn_131f_0575.mp3', spk: '131 (female, -1, gauteng)'},
  {id: 'nchlt_tsn_079m_0319', tsw: 'tsweetswee o se ka wa', audio: 'nchlt/nchlt_tsn_079m_0319.mp3', spk: '079 (male, 20, gauteng)'},
  {id: 'nchlt_tsn_008f_0407', tsw: 'botswana', audio: 'nchlt/nchlt_tsn_008f_0407.mp3', spk: '008 (female, 20, north west)'},
  {id: 'nchlt_tsn_086f_0195', tsw: 'le ya bana ba ba', audio: 'nchlt/nchlt_tsn_086f_0195.mp3', spk: '086 (female, 33, gauteng)'},
  {id: 'nchlt_tsn_077m_0281', tsw: 'ntlo', audio: 'nchlt/nchlt_tsn_077m_0281.mp3', spk: '077 (male, 17, gauteng)'},
  {id: 'nchlt_tsn_183m_0097', tsw: 'dikgomo', audio: 'nchlt/nchlt_tsn_183m_0097.mp3', spk: '183 (male, -1, gauteng)'},
  {id: 'nchlt_tsn_167m_0085', tsw: 'bana', audio: 'nchlt/nchlt_tsn_167m_0085.mp3', spk: '167 (male, -1, gauteng)'},
  {id: 'nchlt_tsn_014f_0430', tsw: 'ba le babedi ba ba', audio: 'nchlt/nchlt_tsn_014f_0430.mp3', spk: '014 (female, 23, north west)'},
  {id: 'nchlt_tsn_069m_0340', tsw: 'borra', audio: 'nchlt/nchlt_tsn_069m_0340.mp3', spk: '069 (male, 19, gauteng)'},
  {id: 'nchlt_tsn_087f_0618', tsw: 'ba go ithuta ba ba', audio: 'nchlt/nchlt_tsn_087f_0618.mp3', spk: '087 (female, 35, gauteng)'},
  {id: 'nchlt_tsn_022m_0447', tsw: 'barutabana', audio: 'nchlt/nchlt_tsn_022m_0447.mp3', spk: '022 (male, -1, north west)'},
  {id: 'nchlt_tsn_079m_0112', tsw: 'o tla go kopa go', audio: 'nchlt/nchlt_tsn_079m_0112.mp3', spk: '079 (male, 20, gauteng)'},
  {id: 'nchlt_tsn_084f_0553', tsw: 'ya gago o le kwa', audio: 'nchlt/nchlt_tsn_084f_0553.mp3', spk: '084 (female, -1, gauteng)'},
  {id: 'nchlt_tsn_139m_0408', tsw: 'ke eng se o se', audio: 'nchlt/nchlt_tsn_139m_0408.mp3', spk: '139 (male, -1, gauteng)'},
  {id: 'nchlt_tsn_090f_0875', tsw: 'e ka bona go le', audio: 'nchlt/nchlt_tsn_090f_0875.mp3', spk: '090 (female, -1, gauteng)'}
];
