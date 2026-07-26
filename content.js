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
            { id: 'u1l1-07', audio: 'items/u1l1-07.mp3', kind: 'phrase', tsw: 'Ke teng', eng: 'I am fine', src: 'peace-corps-L2', note: 'teng = present/there. "I am around" = I\'m fine.' },
            { id: 'u1l1-16', audio: 'items/u1l1-16.mp3', kind: 'phrase', tsw: 'Re teng, a lona le teng?', eng: 'We are fine — are you all well?', src: 'peace-corps-L2', note: 'Informal reply to Le kae?. Lit. "we are there — are you (all) there?"' },
            { id: 'u1l1-20', audio: 'items/u1l1-20.mp3', kind: 'phrase', tsw: 'Re teng', eng: 'We are fine', src: 'peace-corps-L2', note: 'Ke teng = I\'m fine, Re teng = we\'re fine — same teng, different concord.' },
            { id: 'u1l1-08', audio: 'items/u1l1-08.mp3', kind: 'phrase', tsw: 'Re a leboga', eng: 'Thank you (we thank)', src: 'peace-corps-L2' },
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
            { id: 'u1l2-05', audio: 'items/u1l2-05.mp3', kind: 'phrase', tsw: 'Ke tswa kwa Botswana', eng: 'I am from Botswana', src: 'peace-corps-L3', note: 'go tswa = to come from; kwa points to a place.' },
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
            { id: 'u1l4-11', audio: 'items/u1l4-11.mp3', kind: 'phrase', tsw: 'O na le buka', eng: 'You have a book / He-she has a book', src: 'peace-corps-L11', concordSlot: { answer: 'O', options: ['Ke', 'O', 'Re', 'Ba'], tail: 'na le buka', hint: 'you / he-she' }, note: 'One o for both — Setswana doesn\'t split "you" and "he/she" here. Context decides.' },
            { id: 'u1l4-12', audio: 'items/u1l4-12.mp3', kind: 'phrase', tsw: 'O a bala', eng: 'You are reading / He-she is reading', src: 'peace-corps-L11', concordSlot: { answer: 'O', options: ['Ke', 'O', 'Lo', 'Ba'], tail: 'a bala', hint: 'you / he-she' }, note: 'One o for both — Setswana doesn\'t split "you" and "he/she" here. Context decides.' },
            { id: 'u1l4-13', audio: 'items/u1l4-13.mp3', kind: 'phrase', tsw: 'Lo a bala', eng: 'You are reading (a group)', src: 'peace-corps-L11', concordSlot: { answer: 'Lo', options: ['Ke', 'O', 'Lo', 'Re'], tail: 'a bala', hint: 'you all' }, note: 'The book\'s table uses lo for "you (pl)" here — le works too, as lona\'s card says.' },
            { id: 'u1l4-14', audio: 'items/u1l4-14.mp3', kind: 'phrase', tsw: 'Lo na le buka', eng: 'You have a book (a group)', src: 'peace-corps-L11', concordSlot: { answer: 'Lo', options: ['Ke', 'O', 'Lo', 'Re'], tail: 'na le buka', hint: 'you all' }, note: 'The book\'s table uses lo for "you (pl)" here — le works too, as lona\'s card says.' }
          ]
        },
        {
          id: 'u1l5', title: 'Batho le dilo', blurb: 'Noun classes: why people are mo-/ba- and things are se-/di-.',
          items: [
            { id: 'u1l5-00', kind: 'rule', tsw: '', eng: '', src: 'grammar-toolkit', rule: 'Every Setswana noun belongs to a class, shown by its prefix — and singular/plural is a prefix swap, not an added -s. People: mo-/ba- (motho → batho). Things & languages: se-/di- (setilo → ditilo; Setswana itself is class se-!). Misc: le-/ma- (leina → maina). Animals and borrowed words: (n)-/di(n)- (ntlo → dintlo, buka → dibuka).' },
            { id: 'u1l5-01', audio: 'items/u1l5-01.mp3', kind: 'word', tsw: 'motho', eng: 'person', src: 'grammar-toolkit', cls: 1, plural: 'batho', note: 'mo- (person, singular) → ba- (plural): batho = people.' },
            { id: 'u1l5-02', audio: 'items/u1l5-02.mp3', kind: 'word', tsw: 'batho', eng: 'people', src: 'grammar-toolkit', cls: 2, note: 'Plural of motho.' },
            { id: 'u1l5-03', audio: 'items/u1l5-03.mp3', kind: 'word', tsw: 'Setswana', eng: 'the Setswana language', src: 'module-doc', cls: 7, note: 'se- marks languages and cultures: Setswana, Sekgoa (English)…' },
            { id: 'u1l5-04', audio: 'items/u1l5-04.mp3', kind: 'word', tsw: 'setilo', eng: 'chair', src: 'peace-corps-L7', cls: 7, plural: 'ditilo', note: 'se- → di-: ditilo = chairs.' },
            { id: 'u1l5-05', audio: 'items/u1l5-05.mp3', kind: 'word', tsw: 'buka', eng: 'book', src: 'peace-corps-L7', cls: 9, plural: 'dibuka' },
            { id: 'u1l5-06', audio: 'items/u1l5-06.mp3', kind: 'word', tsw: 'ntlo', eng: 'house', src: 'peace-corps-L18', cls: 9, plural: 'dintlo' },
            { id: 'u1l5-07', audio: 'items/u1l5-07.mp3', kind: 'word', tsw: 'leina', eng: 'name', src: 'peace-corps-L3', cls: 5, plural: 'maina', note: 'le- → ma-: maina = names.' },
            { id: 'u1l5-08', audio: 'items/u1l5-08.mp3', kind: 'word', tsw: 'lebati', eng: 'door', src: 'peace-corps-L7', cls: 5, plural: 'mabati' },
            { id: 'u1l5-09', audio: 'items/u1l5-09.mp3', kind: 'word', tsw: 'sekolo', eng: 'school', src: 'peace-corps-L18', cls: 7, plural: 'dikolo' },
            { id: 'u1l5-10', audio: 'items/u1l5-10.mp3', kind: 'word', tsw: 'lelapa', eng: 'family / home', src: 'peace-corps-L15', cls: 5 }
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
            { id: 'u1l6-09', audio: 'items/u1l6-09.mp3', kind: 'phrase', tsw: 'Ke batla kofi', eng: 'I want coffee', src: 'peace-corps-L13', note: 'Object follows, so no "a": not "ke a batla kofi".' },
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
            { id: 'u1l7-06', audio: 'items/u1l7-06.mp3', kind: 'phrase', tsw: 'Nnyaa, ga ke na mathata', eng: 'No, I don\'t have a problem', src: 'peace-corps-L6', note: 'ga ke na = I don\'t have.' },
            { id: 'u1l7-07', audio: 'items/u1l7-07.mp3', kind: 'phrase', tsw: 'Ga ke batle tee', eng: 'I don\'t want tea', src: 'peace-corps-L10+L14', note: 'Built from Ga ke batle + tee (both sourced).' },
            { id: 'u1l7-08', audio: 'items/u1l7-08.mp3', kind: 'phrase', tsw: 'Ga ba bue Sekgoa', eng: 'They don\'t speak English', src: 'peace-corps-L10+L5', note: 'Sekgoa = English. bua → bue in the negative.' }
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
            { id: 'u2l1-00', kind: 'rule', tsw: '', eng: '', src: 'grammar-toolkit', rule: 'Body parts are a noun-class safari: head words scatter across the classes, so their plurals differ. le-/ma- (leitlho → matlho), se-/di- (sefatlhego → difatlhego), mo-/me- (molomo → melomo), ∅/di- (tsebe → ditsebe). Watch the prefix — it tells you the plural AND the concord.' },
            { id: 'u2l1-01', audio: 'items/u2l1-01.mp3', kind: 'word', tsw: 'mmele', eng: 'body', src: 'beibele+nt-parallel', cls: 3, plural: 'mebele' },
            { id: 'u2l1-02', audio: 'items/u2l1-02.mp3', kind: 'word', tsw: 'tlhogo', eng: 'head', src: 'peace-corps-L22', cls: 9, plural: 'ditlhogo' },
            { id: 'u2l1-03', audio: 'items/u2l1-03.mp3', kind: 'word', tsw: 'sefatlhego', eng: 'face', src: 'beibele+nt-parallel', cls: 7, plural: 'difatlhego' },
            { id: 'u2l1-04', audio: 'items/u2l1-04.mp3', kind: 'word', tsw: 'moriri', eng: 'hair', src: 'beibele+nt-parallel', cls: 3, plural: 'meriri' },
            { id: 'u2l1-05', audio: 'items/u2l1-05.mp3', kind: 'word', tsw: 'leitlho', eng: 'eye', src: 'beibele+nt-parallel', cls: 5, plural: 'matlho', note: 'le- → ma-: matlho = eyes.' },
            { id: 'u2l1-06', audio: 'items/u2l1-06.mp3', kind: 'word', tsw: 'tsebe', eng: 'ear', src: 'beibele+nt-parallel', cls: 9, plural: 'ditsebe' },
            { id: 'u2l1-07', audio: 'items/u2l1-07.mp3', kind: 'word', tsw: 'nko', eng: 'nose', src: 'beibele', cls: 9, plural: 'dinko' },
            { id: 'u2l1-08', audio: 'items/u2l1-08.mp3', kind: 'word', tsw: 'molomo', eng: 'mouth', src: 'beibele+nt-parallel', cls: 3, plural: 'melomo' },
            { id: 'u2l1-09', audio: 'items/u2l1-09.mp3', kind: 'word', tsw: 'leino', eng: 'tooth', src: 'beibele', cls: 5, plural: 'meno', note: 'le- → ma-… almost: meno, not maino. Old class quirk.' },
            { id: 'u2l1-10', audio: 'items/u2l1-10.mp3', kind: 'word', tsw: 'loleme', eng: 'tongue', src: 'beibele+nt-parallel', cls: 11, plural: 'diteme', note: 'Class 11 lo-; plural jumps to di-: diteme.' },
            { id: 'u2l1-11', audio: 'items/u2l1-11.mp3', kind: 'word', tsw: 'molala', eng: 'neck', src: 'beibele', cls: 3, plural: 'melala' }
          ]
        },
        {
          id: 'u2l2', title: 'Diatla le dinao', blurb: 'Arms, hands, legs, feet — and the heart of it all.',
          items: [
            { id: 'u2l2-01', audio: 'items/u2l2-01.mp3', kind: 'word', tsw: 'letsogo', eng: 'arm / hand', src: 'beibele+nt-parallel', cls: 5, plural: 'mabogo', note: 'Irregular plural: mabogo, not matsogo.' },
            { id: 'u2l2-02', audio: 'items/u2l2-02.mp3', kind: 'word', tsw: 'seatla', eng: 'hand', src: 'beibele+nt-parallel', cls: 7, plural: 'diatla', note: 'The palm-and-fingers hand; letsogo is the whole arm.' },
            { id: 'u2l2-03', audio: 'items/u2l2-03.mp3', kind: 'word', tsw: 'monwana', eng: 'finger', src: 'beibele+nt-parallel', cls: 3, plural: 'menwana' },
            { id: 'u2l2-04', audio: 'items/u2l2-04.mp3', kind: 'word', tsw: 'mpa', eng: 'stomach / belly', src: 'beibele+nt-parallel', cls: 9, note: 'Careful: mpa is also a little word meaning "rather/merely". Context decides.' },
            { id: 'u2l2-05', audio: 'items/u2l2-05.mp3', kind: 'word', tsw: 'mala', eng: 'stomach / insides', src: 'peace-corps-L22', cls: 6, note: 'The word the Peace Corps health lesson uses: mala ame a botlhoko.' },
            { id: 'u2l2-06', audio: 'items/u2l2-06.mp3', kind: 'word', tsw: 'pelo', eng: 'heart', src: 'beibele+nt-parallel', cls: 9, plural: 'dipelo', note: 'Pelo-khutshwane, "short heart" = short-tempered. Setswana anatomy has opinions.' },
            { id: 'u2l2-07', audio: 'items/u2l2-07.mp3', kind: 'word', tsw: 'leoto', eng: 'leg', src: 'peace-corps-L22', cls: 5, plural: 'maoto' },
            { id: 'u2l2-08', audio: 'items/u2l2-08.mp3', kind: 'word', tsw: 'lonao', eng: 'foot', src: 'beibele', cls: 11, plural: 'dinao', note: 'You met dinao in Unit 1: Ema ka dinao — stand on your feet.' },
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
            { id: 'u2l4-01', audio: 'items/u2l4-01.mp3', kind: 'word', tsw: 'ngaka', eng: 'doctor', src: 'pc-comp-grammar-ch7', cls: 9, plural: 'dingaka' },
            { id: 'u2l4-02', audio: 'items/u2l4-02.mp3', kind: 'word', tsw: 'morutabana', eng: 'teacher', src: 'nchlt+otlogetswe-2010', cls: 1, plural: 'barutabana', note: 'mo-/ba-, a person word — your job title, soon.' },
            { id: 'u2l4-03', audio: 'items/u2l4-03.mp3', kind: 'phrase', tsw: 'Mpho ke ngaka', eng: 'Mpho is a doctor', src: 'pc-comp-grammar-ch7', concordSlot: { head: 'Mpho', answer: 'ke', options: ['ke', 'o', 'ga se', 'ba'], tail: 'ngaka', hint: 'is (about someone else)' } },
            { id: 'u2l4-04', audio: 'items/u2l4-04.mp3', kind: 'phrase', tsw: 'Ke morutabana', eng: 'I am a teacher', src: 'pc-comp-grammar-ch2', note: 'That ke is the I-marker doing copula duty — not the same ke as in Mpho ke ngaka.' },
            { id: 'u2l4-05', audio: 'items/u2l4-05.mp3', kind: 'phrase', tsw: 'Ga se ngaka', eng: 'He/she is not a doctor', src: 'pc-comp-grammar-ch2', note: 'ga se = is not (identity).' },
            { id: 'u2l4-06', audio: 'items/u2l4-06.mp3', kind: 'phrase', tsw: 'Mpho o mo ntlong', eng: 'Mpho is in the house', src: 'pc-comp-grammar-ch7', note: 'Location: mo + noun + -ng. ntlo → mo ntlong.' },
            { id: 'u2l4-07', audio: 'items/u2l4-07.mp3', kind: 'phrase', tsw: 'Le ene ke moithaopi wa Peace Corps', eng: 'He too is a Peace Corps volunteer', src: 'pc-comp-grammar-dialogue', note: 'le ene = him/her too.' },
            { id: 'u2l4-08', audio: 'items/u2l4-08.mp3', kind: 'phrase', tsw: 'O na le bana ba le babedi', eng: 'He/she has two children', src: 'pc-comp-grammar-ch2', note: 'Counting people: ba le babedi — the concord counts along.' }
          ]
        },
        {
          id: 'u2l5', title: 'Mmele o montle', blurb: 'Adjectives & adverbs: describing what you see.',
          items: [
            { id: 'u2l5-00', kind: 'rule', tsw: '', eng: '', src: 'pc-comp-grammar-ch4', rule: 'Adjectives agree with their noun\'s class, like everything else. "The X is …" = subject marker + adjective: Mpho o montle (Mpho is beautiful), Dikgomo di bogale (the cows are fierce). Many adjectives repeat the class prefix: di-ntle, mo-golo, mo-nnye. Adverbs are easier — sentle (well) and thata (very/a lot) just follow the verb.' },
            { id: 'u2l5-01', audio: 'items/u2l5-01.mp3', kind: 'word', tsw: 'mogolo', eng: 'big / great / elder', src: 'beibele', note: 'You met it in ntate mogolo — grandfather, the "great father". Class 9 form: kgolo.' },
            { id: 'u2l5-02', audio: 'items/u2l5-02.mp3', kind: 'word', tsw: 'monnye', eng: 'small / young', src: 'beibele' },
            { id: 'u2l5-03', audio: 'items/u2l5-03.mp3', kind: 'word', tsw: 'moleele', eng: 'tall / long', src: 'beibele', note: 'Class 9 form: telele (tsela e telele — a long road).' },
            { id: 'u2l5-04', audio: 'items/u2l5-04.mp3', kind: 'word', tsw: 'khutshwane', eng: 'short', src: 'beibele' },
            { id: 'u2l5-05', audio: 'items/u2l5-05.mp3', kind: 'word', tsw: 'monate', eng: 'nice / tasty / sweet', src: 'beibele', note: 'Dijo di monate — the food is delicious. You will use this one.' },
            { id: 'u2l5-06', audio: 'items/u2l5-06.mp3', kind: 'phrase', tsw: 'Mpho o montle', eng: 'Mpho is beautiful', src: 'pc-comp-grammar-ch7' },
            { id: 'u2l5-07', audio: 'items/u2l5-07.mp3', kind: 'phrase', tsw: 'Dikgomo di bogale', eng: 'The cows are fierce', src: 'pc-comp-grammar-ch2', concordSlot: { head: 'Dikgomo', answer: 'di', options: ['di', 'ba', 'e', 'a'], tail: 'bogale', hint: 'cows — class 10' } },
            { id: 'u2l5-08', audio: 'items/u2l5-08.mp3', kind: 'phrase', tsw: 'Dikgomo di dintle', eng: 'The cows are beautiful', src: 'pc-comp-grammar-ch2', note: 'Weak adjective repeats the prefix: di + di-ntle.' },
            { id: 'u2l5-09', audio: 'items/u2l5-09.mp3', kind: 'phrase', tsw: 'Ke na le dikgomo tse dintle', eng: 'I have beautiful cows', src: 'pc-comp-grammar-ch4', note: 'Inside a phrase the adjective takes a linker: tse dintle.' },
            { id: 'u2l5-10', audio: 'items/u2l5-10.mp3', kind: 'word', tsw: 'dikgomo', eng: 'cows / cattle', src: 'pc-comp-grammar-ch2', cls: 10, note: 'Singular: kgomo. The grammar book\'s favourite example animal.' },
            { id: 'u2l5-11', audio: 'items/u2l5-11.mp3', kind: 'phrase', tsw: 'O opela sentle', eng: 'You sing well', src: 'pc-comp-grammar-adv', note: 'go opela = to sing; sentle after the verb = well.' },
            { id: 'u2l5-12', audio: 'items/u2l5-12.mp3', kind: 'phrase', tsw: 'Ke rata nama thata', eng: 'I like meat a lot', src: 'pc-comp-grammar-adv', note: 'thata = very / a lot; nama = meat.' }
          ]
        },
        {
          id: 'u2l6', title: 'Mebala', blurb: 'Colours — including the one word that is both green and blue.',
          items: [
            { id: 'u2l6-00', kind: 'rule', tsw: '', eng: '', src: 'davies-1992', rule: 'Setswana colour names wear the abstract bo- prefix: bontsho (black), bosweu (white), bohibidu (red). The famous one: botala covers BOTH green and blue — one colour to Setswana eyes. Need to split it? botala jwa tlhaga (grue of the grass = green) vs botala jwa legodimo (grue of the sky = blue). Describing a thing, the stem takes the noun\'s concord: pitse e tshweu — a white horse.' },
            { id: 'u2l6-01', audio: 'items/u2l6-01.mp3', kind: 'word', tsw: 'bontsho', eng: 'black', src: 'davies-1992' },
            { id: 'u2l6-02', audio: 'items/u2l6-02.mp3', kind: 'word', tsw: 'bosweu', eng: 'white', src: 'davies-1992' },
            { id: 'u2l6-03', audio: 'items/u2l6-03.mp3', kind: 'word', tsw: 'bohibidu', eng: 'red', src: 'davies-1992' },
            { id: 'u2l6-04', audio: 'items/u2l6-04.mp3', kind: 'word', tsw: 'botala', eng: 'green / blue', src: 'davies-1992', note: 'One word, two English colours — "grue". Linguists study Setswana for this.' },
            { id: 'u2l6-05', audio: 'items/u2l6-05.mp3', kind: 'phrase', tsw: 'botala jwa tlhaga', eng: 'green (grass-colour)', src: 'davies-1992' },
            { id: 'u2l6-06', audio: 'items/u2l6-06.mp3', kind: 'phrase', tsw: 'botala jwa legodimo', eng: 'blue (sky-colour)', src: 'davies-1992' },
            { id: 'u2l6-07', audio: 'items/u2l6-07.mp3', kind: 'word', tsw: 'bosetlha', eng: 'yellow', src: 'davies-1992' },
            { id: 'u2l6-08', audio: 'items/u2l6-08.mp3', kind: 'word', tsw: 'borokwa', eng: 'brown', src: 'davies-1992' },
            { id: 'u2l6-09', audio: 'items/u2l6-09.mp3', kind: 'word', tsw: 'selaole', eng: 'purple', src: 'davies-1992' },
            { id: 'u2l6-10', audio: 'items/u2l6-10.mp3', kind: 'phrase', tsw: 'Pitse e tshweu', eng: 'A white horse', src: 'beibele', concordSlot: { head: 'Pitse', answer: 'e', options: ['e', 'di', 'o', 'le'], tail: 'tshweu', hint: 'horse — class 9' }, note: '-sweu hardens to tshweu after class 9\'s hidden N. Straight out of Revelation 6.' },
            { id: 'u2l6-11', audio: 'items/u2l6-11.mp3', kind: 'phrase', tsw: 'Pitse e ntsho', eng: 'A black horse', src: 'beibele' },
            { id: 'u2l6-12', audio: 'items/u2l6-12.mp3', kind: 'phrase', tsw: 'Tlhale e khibidu', eng: 'A red thread', src: 'beibele', note: '-hibidu hardens to khibidu the same way.' }
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
            { id: 'u2l7-08', audio: 'items/u2l7-08.mp3', kind: 'word', tsw: 'botlhoko', eng: 'sore / painful', src: 'peace-corps-L22' },
            { id: 'u2l7-09', audio: 'items/u2l7-09.mp3', kind: 'phrase', tsw: 'O rurugile leoto', eng: 'His/her leg is swollen', src: 'peace-corps-L22', note: 'go ruruga = to swell.' },
            { id: 'u2l7-10', audio: 'items/u2l7-10.mp3', kind: 'phrase', tsw: 'O ile ngakeng', eng: 'He/she went to the doctor', src: 'peace-corps-L22', note: 'ngaka + -ng = ngakeng, "to the doctor\'s".' },
            { id: 'u2l7-11', audio: 'items/u2l7-11.mp3', kind: 'phrase', tsw: 'Ke kopa thuso', eng: 'I need help', src: 'peace-corps-L23', note: 'Lit. "I ask for help" — polite and useful everywhere.' }
          ]
        }
      ]
    },
    {
      id: 'u3',
      title: 'Mo sekolong',
      subtitle: 'At school — SECL121 Unit 3. Part 1: the Go batla verb-clock · Part 2: classroom life.',
      lessons: [
        {
          id: 'u3l1', title: 'Ke a batla', blurb: 'Part 1 · the verb-clock. Wanting, right now — and not wanting.',
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
            { id: 'u3l1-08', audio: 'items/u3l1-08.mp3', kind: 'phrase', tsw: 'Ga a batle', eng: 'She/he does not want', src: 'peace-corps-L10', concordSlot: { head: 'Ga', answer: 'a', options: ['ke', 'a', 're', 'ba'], tail: 'batle', hint: 'she/he' }, note: 'Here o finally splits: "you" stays o, but "she/he" becomes a in the negative.' },
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
            { id: 'u3l2-04', audio: 'items/u3l2-04.mp3', kind: 'phrase', tsw: 'Re ne re batla', eng: 'We wanted', src: 'peace-corps-L10', concordSlot: { head: 'Re ne', answer: 're', options: ['ke', 'o', 're', 'ba'], tail: 'batla', hint: 'we — the second concord' } },
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
            { id: 'u3l3-08', audio: 'items/u3l3-08.mp3', kind: 'phrase', tsw: 'Ga a kake a batla', eng: 'She/he will not want', src: 'peace-corps-L10', concordSlot: { head: 'Ga a kake', answer: 'a', options: ['a', 'wa', 'ra', 'la'], tail: 'batla', hint: 'she/he — the changed second concord' }, note: 'she/he is the lazy one: a stays a.' },
            { id: 'u3l3-09', audio: 'items/u3l3-09.mp3', kind: 'phrase', tsw: 'Ga re kake ra batla', eng: 'We will not want', src: 'peace-corps-L10', concordSlot: { head: 'Ga re kake', answer: 'ra', options: ['ka', 'wa', 'ra', 'la'], tail: 'batla', hint: 'we — the changed second concord' } },
            { id: 'u3l3-10', audio: 'items/u3l3-10.mp3', kind: 'phrase', tsw: 'Ga le kake la batla', eng: 'You will not want (a group)', src: 'peace-corps-L10', concordSlot: { head: 'Ga le kake', answer: 'la', options: ['ka', 'wa', 'ra', 'la'], tail: 'batla', hint: 'you all — the changed second concord' } },
            { id: 'u3l3-11', audio: 'items/u3l3-11.mp3', kind: 'phrase', tsw: 'Ga ba kake ba batla', eng: 'They will not want', src: 'peace-corps-L10', concordSlot: { head: 'Ga ba kake', answer: 'ba', options: ['ba', 'wa', 'ra', 'la'], tail: 'batla', hint: 'they — the changed second concord' }, note: 'they is lazy too: ba stays ba.' }
          ]
        },
        {
          id: 'u3l4', title: 'Mo tlelaseng', blurb: 'Part 2 · Mo sekolong. The words you\'ll use in a classroom.',
          items: [
            { id: 'u3l4-00', kind: 'rule', tsw: '', eng: '', src: 'grammar-toolkit', rule: 'School words gather from a few noun classes. People are mo-/ba-: morutabana (teacher) → barutabana, moithuti (learner) → baithuti. Most classroom objects are borrowed words, so they sit in class 9/10 and just add di- for the plural: pene → dipene, tafole → ditafole. You already met buka, setilo and lebati back in Unit 1.' },
            { id: 'u3l4-01', audio: 'items/u3l4-01.mp3', kind: 'word', tsw: 'moithuti', eng: 'learner / student', src: 'pc-comp-grammar-ch2', cls: 1, plural: 'baithuti', note: 'mo-/ba-: baithuti = learners. From go ithuta, to learn — the person who learns.' },
            { id: 'u3l4-02', audio: 'items/u3l4-02.mp3', kind: 'word', tsw: 'tlelase', eng: 'classroom', src: 'peace-corps-L18', cls: 9, plural: 'ditlelase', note: 'A borrowed word (from "class"), so class 9: plural ditlelase.' },
            { id: 'u3l4-03', audio: 'items/u3l4-03.mp3', kind: 'word', tsw: 'tafole', eng: 'table', src: 'peace-corps-L7', cls: 9, plural: 'ditafole' },
            { id: 'u3l4-04', audio: 'items/u3l4-04.mp3', kind: 'word', tsw: 'fensetere', eng: 'window', src: 'peace-corps-L7', cls: 9, plural: 'difensetere' },
            { id: 'u3l4-05', audio: 'items/u3l4-05.mp3', kind: 'word', tsw: 'pene', eng: 'pen', src: 'peace-corps-L7', cls: 9, plural: 'dipene' },
            { id: 'u3l4-06', audio: 'items/u3l4-06.mp3', kind: 'word', tsw: 'pensele', eng: 'pencil', src: 'peace-corps-L7', cls: 9, plural: 'dipensele' },
            { id: 'u3l4-07', audio: 'items/u3l4-07.mp3', kind: 'word', tsw: 'beke', eng: 'bag', src: 'peace-corps-L7', cls: 9, plural: 'dibeke' }
          ]
        },
        {
          id: 'u3l5', title: 'Reetsa!', blurb: 'The things a teacher says out loud, all day.',
          items: [
            { id: 'u3l5-00', kind: 'rule', tsw: '', eng: '', src: 'peace-corps-L12', rule: 'A command is just the bare verb — no concord in front: Reetsa! (Listen!), Nna fatshe (Sit down). Speaking to a group, add -ng: Reetsang! Dumela → Dumelang, which you already know. These are the words you\'ll run a classroom in.' },
            { id: 'u3l5-01', audio: 'items/u3l5-01.mp3', kind: 'phrase', tsw: 'Reetsa', eng: 'Listen', src: 'peace-corps-L12', note: 'To a group: Reetsang. Also means "pay attention".' },
            { id: 'u3l5-02', audio: 'items/u3l5-02.mp3', kind: 'phrase', tsw: 'Nna fatshe', eng: 'Sit down', src: 'peace-corps-L12' },
            { id: 'u3l5-03', kind: 'phrase', tsw: 'Ema ka dinao', eng: 'Stand up', src: 'peace-corps-L12', audio: 'items/u2l2-09.mp3', note: 'You met this in Unit 2 — "stand on your feet". Here it is as a classroom command.' },
            { id: 'u3l5-04', audio: 'items/u3l5-04.mp3', kind: 'phrase', tsw: 'Ema o bue', eng: 'Stand up and speak', src: 'peace-corps-L12' },
            { id: 'u3l5-05', audio: 'items/u3l5-05.mp3', kind: 'phrase', tsw: 'Tla kwano', eng: 'Come here', src: 'peace-corps-L12', note: 'Book spells it "tlaa"; we write tla, matching Ke tla go bona.' },
            { id: 'u3l5-06', audio: 'items/u3l5-06.mp3', kind: 'phrase', tsw: 'Tla kwa pele', eng: 'Come to the front', src: 'peace-corps-L12' },
            { id: 'u3l5-07', audio: 'items/u3l5-07.mp3', kind: 'phrase', tsw: 'Boela kwa morago', eng: 'Go back', src: 'peace-corps-L12', note: 'Lit. "return to the back".' },
            { id: 'u3l5-08', audio: 'items/u3l5-08.mp3', kind: 'phrase', tsw: 'Tsena mo teng', eng: 'Come inside', src: 'peace-corps-L12' },
            { id: 'u3l5-09', audio: 'items/u3l5-09.mp3', kind: 'phrase', tsw: 'Bula lebati', eng: 'Open the door', src: 'peace-corps-L12', note: 'lebati = door (Unit 1). Close it: Tswala lebati.' },
            { id: 'u3l5-10', audio: 'items/u3l5-10.mp3', kind: 'phrase', tsw: 'Tswala lebati', eng: 'Close the door', src: 'peace-corps-L12' }
          ]
        },
        {
          id: 'u3l6', title: 'Maabane le kamoso', blurb: 'When did it happen? The adverbs that set the time.',
          items: [
            { id: 'u3l6-00', kind: 'rule', tsw: '', eng: '', src: 'peace-corps-L16', rule: 'Time words tell you which tense to reach for. gompieno (today) goes with the present, maabane (yesterday) pulls the past, kamoso (tomorrow) pushes the future. They usually sit at the start or the very end of the sentence: Kamoso ke tla ya sekolong — tomorrow I will go to school.' },
            { id: 'u3l6-01', audio: 'items/u3l6-01.mp3', kind: 'word', tsw: 'gompieno', eng: 'today', src: 'peace-corps-L16' },
            { id: 'u3l6-02', audio: 'items/u3l6-02.mp3', kind: 'word', tsw: 'maabane', eng: 'yesterday', src: 'peace-corps-L16', note: 'Your cue for the past tense.' },
            { id: 'u3l6-03', audio: 'items/u3l6-03.mp3', kind: 'word', tsw: 'kamoso', eng: 'tomorrow', src: 'peace-corps-L16', note: 'Your cue for the future. You met it in Ke tla go bona kamoso.' },
            { id: 'u3l6-04', audio: 'items/u3l6-04.mp3', kind: 'word', tsw: 'phakela', eng: 'in the morning / early', src: 'peace-corps-L16' },
            { id: 'u3l6-05', audio: 'items/u3l6-05.mp3', kind: 'word', tsw: 'motshegare', eng: 'at midday / in the afternoon', src: 'peace-corps-L16' },
            { id: 'u3l6-06', audio: 'items/u3l6-06.mp3', kind: 'word', tsw: 'maitseboa', eng: 'in the evening', src: 'peace-corps-L16' },
            { id: 'u3l6-07', audio: 'items/u3l6-07.mp3', kind: 'word', tsw: 'bosigo', eng: 'at night', src: 'peace-corps-L16' },
            { id: 'u3l6-08', audio: 'items/u3l6-08.mp3', kind: 'phrase', tsw: 'gone jaanong', eng: 'right now / at the moment', src: 'peace-corps-L16', note: 'jaanong = now (you saw it in O batla go dira eng jaanong?).' },
            { id: 'u3l6-09', audio: 'items/u3l6-09.mp3', kind: 'word', tsw: 'kgantele', eng: 'later on', src: 'peace-corps-L16', note: 'The word inside Ke tla go bona kgantele, on its own.' }
          ]
        },
        {
          id: 'u3l7', title: 'Ke ile kwa sekolong', blurb: 'What happened yesterday: the past tense at school.',
          items: [
            { id: 'u3l7-00', kind: 'rule', tsw: '', eng: '', src: 'peace-corps-L10+L17', rule: 'Setswana has two ways to look back. The "was doing" past repeats the concord around ne — Ke ne ke ithuta (I was learning) — exactly the shape you drilled with batla in Part 1; remember o → a for she/he (O ne a ruta). The "did / finished" past changes the verb\'s ending instead: go ya → Ke ile (I went), go tlhola → Ke tlhotse (I spent the day). maabane is your cue.' },
            { id: 'u3l7-01', audio: 'items/u3l7-01.mp3', kind: 'phrase', tsw: 'Ke ile kwa sekolong', eng: 'I went to school', src: 'pc-comp-grammar-ch2', concordSlot: { answer: 'Ke', options: ['Ke', 'O', 'Re', 'Ba'], tail: 'ile kwa sekolong', hint: 'I' }, note: 'go ya → ile is the "finished" past of "go".' },
            { id: 'u3l7-02', audio: 'items/u3l7-02.mp3', kind: 'phrase', tsw: 'Mpho o ile kwa sekolong', eng: 'Mpho went to school', src: 'pc-comp-grammar-ch2', concordSlot: { head: 'Mpho', answer: 'o', options: ['o', 'ke', 're', 'ba'], tail: 'ile kwa sekolong', hint: 'Mpho — she/he' } },
            { id: 'u3l7-03', audio: 'items/u3l7-03.mp3', kind: 'phrase', tsw: 'Ke tlhotse kwa sekolong', eng: 'I spent the day at school', src: 'peace-corps-L17', note: 'go tlhola → tlhotse — to spend the day.' },
            { id: 'u3l7-04', audio: 'items/u3l7-04.mp3', kind: 'phrase', tsw: 'Ke ne ke ithuta Setswana', eng: 'I was learning Setswana', src: 'peace-corps-L10+L6', concordSlot: { head: 'Ke ne', answer: 'ke', options: ['ke', 'o', 're', 'ba'], tail: 'ithuta Setswana', hint: 'I — the second concord' }, note: 'The same ne-past as Ke ne ke batla, now with a school verb.' },
            { id: 'u3l7-05', audio: 'items/u3l7-05.mp3', kind: 'phrase', tsw: 'O ne a ruta', eng: 'She/he was teaching', src: 'peace-corps-L10+L5', concordSlot: { head: 'O ne', answer: 'a', options: ['a', 'o', 'ke', 're'], tail: 'ruta', hint: 'she/he — the second concord shifts to a' }, note: 'go ruta = to teach. Watch the o → a for she/he.' },
            { id: 'u3l7-06', audio: 'items/u3l7-06.mp3', kind: 'phrase', tsw: 'Re ne re dira dilo tse dintsi', eng: 'We were doing many things', src: 'peace-corps-L17', note: 'dilo tse dintsi = many things.' },
            { id: 'u3l7-07', audio: 'items/u3l7-07.mp3', kind: 'phrase', tsw: 'Ke ne ke itumetse', eng: 'I was happy', src: 'peace-corps-L17', note: 'From the school-day text: Ke ne ke itumetse gompieno — I was happy today.' },
            { id: 'u3l7-08', audio: 'items/u3l7-08.mp3', kind: 'phrase', tsw: 'Ke rutile', eng: 'I taught', src: 'peace-corps-L5', note: 'go ruta → rutile, the "finished" past. This is the tense you\'ll use to tell someone how your lesson went.' }
          ]
        },
        {
          id: 'u3l8', title: 'Ke tla ya kwa sekolong', blurb: 'What happens tomorrow: the future tense at school.',
          items: [
            { id: 'u3l8-00', kind: 'rule', tsw: '', eng: '', src: 'peace-corps-L10+L17', rule: 'The future is the kind one: concord + tla + verb, nothing else moves. Ke tla ya kwa sekolong — I will go to school. You already say one future sentence without thinking: Ke tla go bona kamoso. kamoso (tomorrow) is your cue.' },
            { id: 'u3l8-01', audio: 'items/u3l8-01.mp3', kind: 'phrase', tsw: 'Ke tla ya kwa sekolong', eng: 'I will go to school', src: 'peace-corps-L10+L17', concordSlot: { answer: 'Ke', options: ['Ke', 'O', 'Re', 'Ba'], tail: 'tla ya kwa sekolong', hint: 'I' } },
            { id: 'u3l8-02', kind: 'phrase', tsw: 'Ke tla go bona kamoso', eng: 'See you tomorrow', src: 'peace-corps-L4', audio: 'items/u1l3-03.mp3', note: 'You already knew a future sentence — here it is again, as proof tla is easy.' },
            { id: 'u3l8-03', audio: 'items/u3l8-03.mp3', kind: 'phrase', tsw: 'Ke tla ithuta', eng: 'I will learn / study', src: 'peace-corps-L10+L6', concordSlot: { answer: 'Ke', options: ['Ke', 'O', 'Re', 'Ba'], tail: 'tla ithuta', hint: 'I' } },
            { id: 'u3l8-04', audio: 'items/u3l8-04.mp3', kind: 'phrase', tsw: 'Ke tla ruta', eng: 'I will teach', src: 'peace-corps-L10+L5', concordSlot: { answer: 'Ke', options: ['Ke', 'O', 'Re', 'Ba'], tail: 'tla ruta', hint: 'I' }, note: 'go ruta = to teach — your future job in one sentence.' },
            { id: 'u3l8-05', audio: 'items/u3l8-05.mp3', kind: 'phrase', tsw: 'Re tla bala buka', eng: 'We will read a book', src: 'peace-corps-L10+L11', concordSlot: { answer: 'Re', options: ['Ke', 'O', 'Re', 'Ba'], tail: 'tla bala buka', hint: 'we' }, note: 'go bala = to read (Unit 1); buka = book.' },
            { id: 'u3l8-06', audio: 'items/u3l8-06.mp3', kind: 'phrase', tsw: 'O tla ya kwa sekolong kamoso', eng: 'You will go to school tomorrow', src: 'peace-corps-L10+L16+L17', concordSlot: { answer: 'O', options: ['Ke', 'O', 'Re', 'Ba'], tail: 'tla ya kwa sekolong kamoso', hint: 'you / she-he' }, note: 'Adverb + future: kamoso pins it to tomorrow.' },
            { id: 'u3l8-07', audio: 'items/u3l8-07.mp3', kind: 'phrase', tsw: 'Ba tla ithuta Setswana', eng: 'They will learn Setswana', src: 'peace-corps-L10+L6', concordSlot: { answer: 'Ba', options: ['Ke', 'Le', 'Re', 'Ba'], tail: 'tla ithuta Setswana', hint: 'they' } }
          ]
        }
      ]
    },
    {
      id: 'u4',
      title: 'Go ja dijo',
      subtitle: 'Eating — SECL121 Unit 4',
      lessons: [
        {
          id: 'u4l1', title: 'Dijo', blurb: 'Food on the table — the words you\'ll eat with every day.',
          items: [
            { id: 'u4l1-00', kind: 'rule', tsw: '', eng: '', src: 'grammar-toolkit', rule: 'Food words spread across the noun classes you already know. dijo (food) is a class-8/10 word — it only comes in the "plural" shape, like the English word "groceries". Borrowed foods sit in class 9 and just add di- for more than one: namune → dinamune (oranges). And some, like metsi (water) and mashi (milk), are mass words with no plural at all. dijo itself is built FROM the verb go ja — eating makes "food". More on word-building next lesson.' },
            { id: 'u4l1-01', audio: 'items/u4l1-01.mp3', kind: 'word', tsw: 'dijo', eng: 'food', src: 'peace-corps-L14', note: 'Only ever "plural" in shape, like "groceries". Built from go ja, to eat.' },
            { id: 'u4l1-02', audio: 'items/u4l1-02.mp3', kind: 'word', tsw: 'nama', eng: 'meat', src: 'peace-corps-L14', cls: 9, note: 'You met it in Ke rata nama thata — I like meat a lot.' },
            { id: 'u4l1-03', audio: 'items/u4l1-03.mp3', kind: 'word', tsw: 'borotho', eng: 'bread', src: 'peace-corps-L14', cls: 9, note: 'A borrowed word (from Afrikaans "brood").' },
            { id: 'u4l1-04', audio: 'items/u4l1-04.mp3', kind: 'word', tsw: 'metsi', eng: 'water', src: 'peace-corps-L14', note: 'A mass word — no singular. Always metsi.' },
            { id: 'u4l1-05', audio: 'items/u4l1-05.mp3', kind: 'word', tsw: 'mashi', eng: 'milk', src: 'peace-corps-L14', note: 'Also a mass word.' },
            { id: 'u4l1-06', audio: 'items/u4l1-06.mp3', kind: 'word', tsw: 'mae', eng: 'eggs', src: 'peace-corps-L14', cls: 6, note: 'One egg = lee (class 5); mae = the plural.' },
            { id: 'u4l1-07', audio: 'items/u4l1-07.mp3', kind: 'word', tsw: 'namune', eng: 'orange', src: 'peace-corps-L14', cls: 9, plural: 'dinamune' },
            { id: 'u4l1-08', audio: 'items/u4l1-08.mp3', kind: 'word', tsw: 'merogo', eng: 'vegetables', src: 'peace-corps-L14', cls: 4, note: 'One vegetable = morogo (mo-); merogo (me-) = vegetables.' },
            { id: 'u4l1-09', audio: 'items/u4l1-09.mp3', kind: 'word', tsw: 'dinawa', eng: 'beans', src: 'peace-corps-L14', cls: 10, note: 'One bean = nawa; dinawa = beans.' },
            { id: 'u4l1-10', audio: 'items/u4l1-10.mp3', kind: 'word', tsw: 'letswai', eng: 'salt', src: 'peace-corps-L14', cls: 5 }
          ]
        },
        {
          id: 'u4l2', title: 'Go dira mafoko', blurb: 'How Setswana grows new words: a verb turns into a noun.',
          items: [
            { id: 'u4l2-00', kind: 'rule', tsw: '', eng: '', src: 'grammar-toolkit', rule: 'Setswana builds new words by changing the FRONT of a word, never by tacking letters on the end like English. A verb becomes a "thing" or a "person" with a new prefix: go ja (to eat) → dijo (food); go nwa (to drink) → dino (drinks); go apaya (to cook) → moapei (a cook). The mo-/ba- prefix turns almost any verb into "the person who does it": go ruta (teach) → moruti. You already did this once without noticing — go ithuta, to learn, is literally "to teach yourself".' },
            { id: 'u4l2-01', audio: 'items/u4l2-01.mp3', kind: 'verb', tsw: 'go apaya', eng: 'to cook', src: 'peace-corps-L5' },
            { id: 'u4l2-02', audio: 'items/u4l2-02.mp3', kind: 'word', tsw: 'moapei', eng: 'a cook', src: 'beibele', cls: 1, plural: 'baapei', note: 'go apaya → moapei: the mo- prefix makes "the one who cooks".' },
            { id: 'u4l2-03', audio: 'items/u4l2-03.mp3', kind: 'word', tsw: 'dino', eng: 'drinks', src: 'beibele', note: 'go nwa (to drink) → dino, the di- pair to dijo. Food and drink: dijo le dino.' },
            { id: 'u4l2-04', audio: 'items/u4l2-04.mp3', kind: 'word', tsw: 'moruti', eng: 'teacher / preacher', src: 'beibele', cls: 1, plural: 'baruti', note: 'go ruta (to teach) → moruti. Same family as morutabana, the schoolteacher you met in Unit 2.' },
            { id: 'u4l2-05', audio: 'items/u4l2-05.mp3', kind: 'word', tsw: 'modiri', eng: 'a worker', src: 'beibele', cls: 1, plural: 'badiri', note: 'go dira (to do / work) → modiri: the one who does.' },
            { id: 'u4l2-06', audio: 'items/u4l2-06.mp3', kind: 'phrase', tsw: 'Re apaya merogo', eng: 'We are cooking vegetables', src: 'pc-comp-grammar-interrog', note: 'Answer to Re apaya eng? — "what are we cooking?"' }
          ]
        },
        {
          id: 'u4l3', title: 'Go bala', blurb: 'Counting from zero to ten — starting with the app\'s own name.',
          items: [
            { id: 'u4l3-00', kind: 'rule', tsw: '', eng: '', src: 'grammar-toolkit', rule: 'Here are the numbers one to ten — and zero, lefela, which you have known all along: Re:Lefela means "we are at zero". Two clean patterns hide in the list: robedi (8) is "ro-bedi", a fold onto two, and robongwe (9) is "ro-bongwe", a fold onto one — a hand folding its last fingers down. lesome is a full ten. Next lesson you\'ll count actual things, where the number grows a little agreement piece in front.' },
            { id: 'u4l3-01', audio: 'items/u4l3-01.mp3', kind: 'word', tsw: 'lefela', eng: 'zero', src: 'grammar-toolkit', note: 'The app\'s name: Re:Lefela = "we are (at) zero" — everyone starts here.' },
            { id: 'u4l3-02', audio: 'items/u4l3-02.mp3', kind: 'word', tsw: 'nngwe', eng: 'one', src: 'beibele', note: 'You\'ll hear it as "e le nngwe" — a single one — when counting things.' },
            { id: 'u4l3-03', audio: 'items/u4l3-03.mp3', kind: 'word', tsw: 'pedi', eng: 'two', src: 'pc-comp-grammar-ch2' },
            { id: 'u4l3-04', audio: 'items/u4l3-04.mp3', kind: 'word', tsw: 'tharo', eng: 'three', src: 'pc-comp-grammar-ch2' },
            { id: 'u4l3-05', audio: 'items/u4l3-05.mp3', kind: 'word', tsw: 'nne', eng: 'four', src: 'pc-comp-grammar-ch2' },
            { id: 'u4l3-06', audio: 'items/u4l3-06.mp3', kind: 'word', tsw: 'tlhano', eng: 'five', src: 'pc-comp-grammar-ch2' },
            { id: 'u4l3-07', audio: 'items/u4l3-07.mp3', kind: 'word', tsw: 'thataro', eng: 'six', src: 'pc-comp-grammar-ch2' },
            { id: 'u4l3-08', audio: 'items/u4l3-08.mp3', kind: 'word', tsw: 'supa', eng: 'seven', src: 'pc-comp-grammar-ch2', note: 'Same word as "point at" — you point out seven.' },
            { id: 'u4l3-09', audio: 'items/u4l3-09.mp3', kind: 'word', tsw: 'robedi', eng: 'eight', src: 'beibele', note: 'ro-bedi: a fold onto two.' },
            { id: 'u4l3-10', audio: 'items/u4l3-10.mp3', kind: 'word', tsw: 'robongwe', eng: 'nine', src: 'beibele', note: 'ro-bongwe: a fold onto one — the last finger.' },
            { id: 'u4l3-11', audio: 'items/u4l3-11.mp3', kind: 'word', tsw: 'lesome', eng: 'ten', src: 'beibele' }
          ]
        },
        {
          id: 'u4l4', title: 'Ba le babedi', blurb: 'Counting real things: the number grows a little agreement piece.',
          items: [
            { id: 'u4l4-00', kind: 'rule', tsw: '', eng: '', src: 'pc-comp-grammar-ch2', rule: 'To count things you don\'t just say the number — you put the noun\'s concord + le in front of it: batho ba le babedi (two people), dikgomo di le pedi (two cows). Two shapes of the number live here: after most classes it takes a prefix (ba-bedi, ba-raro), but classes 8 and 10 use the bare "strong" number (di le pedi, di le tharo). Ask "how many?" with ba le kae? / di le kae?' },
            { id: 'u4l4-01', audio: 'items/u4l4-01.mp3', kind: 'phrase', tsw: 'Namune e le nngwe', eng: 'One orange', src: 'peace-corps-L20', concordSlot: { head: 'Namune', answer: 'e', options: ['e', 'di', 'ba', 'a'], tail: 'le nngwe', hint: 'orange — class 9' }, note: 'From the market: namune e le nngwe ke bokae? — how much is one orange?' },
            { id: 'u4l4-02', audio: 'items/u4l4-02.mp3', kind: 'phrase', tsw: 'Batho ba le babedi', eng: 'Two people', src: 'pc-comp-grammar-ch2', concordSlot: { head: 'Batho', answer: 'ba', options: ['ba', 'di', 'e', 'a'], tail: 'le babedi', hint: 'people — class 2' }, note: 'The number takes the class prefix too: ba + ba-bedi.' },
            { id: 'u4l4-03', audio: 'items/u4l4-03.mp3', kind: 'phrase', tsw: 'Dikgomo di le pedi', eng: 'Two cows', src: 'pc-comp-grammar-ch2', concordSlot: { head: 'Dikgomo', answer: 'di', options: ['di', 'ba', 'e', 'a'], tail: 'le pedi', hint: 'cows — class 10' }, note: 'Class 10 uses the bare strong number: di le pedi, not di le dipedi.' },
            { id: 'u4l4-04', kind: 'phrase', tsw: 'O na le bana ba le babedi', eng: 'She/he has two children', src: 'pc-comp-grammar-ch2', audio: 'items/u2l4-08.mp3', concordSlot: { head: 'O na le bana', answer: 'ba', options: ['ba', 'di', 'e', 'a'], tail: 'le babedi', hint: 'children — class 2' }, note: 'You met this in Unit 2 — here it is again as a counting sentence.' },
            { id: 'u4l4-05', audio: 'items/u4l4-05.mp3', kind: 'phrase', tsw: 'Re na le baithuti ba le kae?', eng: 'How many students do we have?', src: 'pc-comp-grammar-interrog', note: 'ba le kae? = how many? kae here means "how many", not "where".' },
            { id: 'u4l4-06', audio: 'items/u4l4-06.mp3', kind: 'phrase', tsw: 'Dikgomo tse pedi di a ja', eng: 'The two cows are eating', src: 'pc-comp-grammar-ch2', note: 'Another way to count: tse pedi ("those two") right after the noun. Ties back to go ja.' }
          ]
        },
        {
          id: 'u4l5', title: 'Le, mme, kgotsa', blurb: 'Joining words: and, but, or — and the sentences they live in.',
          items: [
            { id: 'u4l5-00', kind: 'rule', tsw: '', eng: '', src: 'peace-corps-L9', rule: 'Small words stitch sentences together: le (and / with), mme (but), kgotsa or kana (or), jaaka (like / as), ka gore (because), ka jalo (therefore). One warning about le: unlike English "and", it joins words and lists but NOT two whole sentences — for that, reach for mme. Everything below is about food, because Setswana grammar books, like everyone, would rather talk about meat.' },
            { id: 'u4l5-01', audio: 'items/u4l5-01.mp3', kind: 'word', tsw: 'le', eng: 'and / with', src: 'peace-corps-L9', note: 'Joins words and lists: dijo le dino (food and drink). NOT for joining two sentences.' },
            { id: 'u4l5-02', audio: 'items/u4l5-02.mp3', kind: 'phrase', tsw: 'Ke rata nama ya koko le nama ya kgomo', eng: 'I like chicken and beef', src: 'pc-comp-grammar-conj', note: 'nama ya koko = chicken meat; nama ya kgomo = beef. le links the two.' },
            { id: 'u4l5-03', audio: 'items/u4l5-03.mp3', kind: 'word', tsw: 'mme', eng: 'but', src: 'peace-corps-L9', note: 'The one that DOES join two sentences, usually contrasting ones.' },
            { id: 'u4l5-04', audio: 'items/u4l5-04.mp3', kind: 'word', tsw: 'kgotsa', eng: 'or', src: 'peace-corps-L9', note: 'kana works the same way.' },
            { id: 'u4l5-05', audio: 'items/u4l5-05.mp3', kind: 'phrase', tsw: 'A o batla go ja nama ya kgomo kgotsa ya koko?', eng: 'Do you want to eat beef or chicken?', src: 'pc-comp-grammar-conj', note: 'A … ? makes it a yes/no question; kgotsa offers the choice.' },
            { id: 'u4l5-06', audio: 'items/u4l5-06.mp3', kind: 'word', tsw: 'ka gore', eng: 'because', src: 'peace-corps-L9' },
            { id: 'u4l5-07', audio: 'items/u4l5-07.mp3', kind: 'phrase', tsw: 'Ke rata seswaa, ka gore ke nama', eng: 'I like seswaa, because it is meat', src: 'pc-comp-grammar-conj', note: 'seswaa = pounded meat, a Botswana favourite.' },
            { id: 'u4l5-08', audio: 'items/u4l5-08.mp3', kind: 'phrase', tsw: 'Seswaa ke nama. Ka jalo, ke a se rata', eng: 'Seswaa is meat. Therefore, I like it', src: 'pc-comp-grammar-conj', note: 'ka jalo = therefore — draws the conclusion.' }
          ]
        }
      ]
    },
    {
      id: 'u5',
      title: 'Diphologolo',
      subtitle: 'Animals — SECL121 Unit 5',
      lessons: [
        {
          id: 'u5l1', title: 'Diphologolo tsa kwa gae', blurb: 'The animals you live with — around the home and the kraal.',
          items: [
            { id: 'u5l1-00', kind: 'rule', tsw: '', eng: '', src: 'grammar-toolkit', rule: 'Almost every animal name is a class 9/10 word — the same class you met in Unit 1 for "animals and borrowed words". That means the singular has no visible prefix and the plural just adds di-: kgomo → dikgomo (cattle), nku → dinku (sheep), podi → dipodi (goats). This is the tidiest plural in Setswana — one rule covers the whole farmyard. The umbrella word for them all is phologolo (an animal) → diphologolo, which is the name of this unit.' },
            { id: 'u5l1-01', audio: 'items/u5l1-01.mp3', kind: 'word', tsw: 'phologolo', eng: 'animal', src: 'beibele', cls: 9, plural: 'diphologolo', note: 'diphologolo (animals) is the unit\'s name. 52× in the Setswana Bible.' },
            { id: 'u5l1-02', audio: 'items/u5l1-02.mp3', kind: 'word', tsw: 'kgomo', eng: 'cow / ox', src: 'pc-comp-grammar-ch2', cls: 9, plural: 'dikgomo', note: 'The grammar book\'s favourite example animal. You already met the plural, dikgomo, in Unit 2.' },
            { id: 'u5l1-03', audio: 'items/u5l1-03.mp3', kind: 'word', tsw: 'nku', eng: 'sheep', src: 'beibele', cls: 9, plural: 'dinku', note: 'Same shape singular and plural stem: nku → dinku. From the shepherd verses (Matthew 25).' },
            { id: 'u5l1-04', audio: 'items/u5l1-04.mp3', kind: 'word', tsw: 'podi', eng: 'goat', src: 'beibele', cls: 9, plural: 'dipodi', note: 'Sheep and goats together: dinku le dipodi (Matthew 25). The Bible itself spells it dipudi; podi/dipodi is the standard SA-Setswana form used here.' },
            { id: 'u5l1-05', audio: 'items/u5l1-05.mp3', kind: 'word', tsw: 'koko', eng: 'chicken / hen', src: 'beibele', cls: 9, plural: 'dikoko', note: 'The hen that gathers her chicks — Matthew 23.' },
            { id: 'u5l1-06', audio: 'items/u5l1-06.mp3', kind: 'word', tsw: 'kolobe', eng: 'pig', src: 'beibele', cls: 9, plural: 'dikolobe', note: 'From "don\'t throw pearls before the pigs" — Matthew 7.' },
            { id: 'u5l1-07', audio: 'items/u5l1-07.mp3', kind: 'word', tsw: 'pitse', eng: 'horse', src: 'beibele', cls: 9, plural: 'dipitse', note: 'You met it dressed in colours in Unit 2: pitse e tshweu (a white horse).' },
            { id: 'u5l1-08', audio: 'items/u5l1-08.mp3', kind: 'word', tsw: 'tonki', eng: 'donkey', src: 'beibele', cls: 9, plural: 'ditonki', note: 'A borrowed word (from "donkey"). The one Jesus rode into Jerusalem — Matthew 21. Older word: esele.' },
            { id: 'u5l1-09', audio: 'items/u5l1-09.mp3', kind: 'word', tsw: 'katse', eng: 'cat', src: 'app-mascot', cls: 9, plural: 'dikatse', note: 'You know one already — Katse, the app\'s own cat and mascot. A real word (Otlogetswe rhyming dictionary), not yet Bible-attested.' },
            { id: 'u5l1-10', audio: 'items/u5l1-10.mp3', kind: 'word', tsw: 'ntša', eng: 'dog', src: 'beibele', cls: 9, plural: 'dintša', note: 'The dogs that licked the beggar\'s sores — Luke 16. The Bible itself spells it dintsa (no caron); ntša/dintša is the standard SA-Setswana form used here.' }
          ]
        },
        {
          id: 'u5l2', title: 'Diphologolo tsa naga', blurb: 'Out in the veld: the wild animals of Setswana story and Scripture.',
          items: [
            { id: 'u5l2-00', kind: 'rule', tsw: '', eng: '', src: 'grammar-toolkit', rule: 'Wild animals follow the same class-9/10 rule as the farm ones: tau → ditau (lions), noga → dinoga (snakes), tlhapi → ditlhapi (fish). Setswana loves an animal picture — the lion is a praise-name for a chief (Tau ya lotso, "the Lion of the tribe"), and being "wise as a snake" is a compliment. You\'ll meet those pictures in the idioms lesson.' },
            { id: 'u5l2-01', audio: 'items/u5l2-01.mp3', kind: 'word', tsw: 'tau', eng: 'lion', src: 'beibele', cls: 9, plural: 'ditau', note: 'The praise-animal: "the Lion of the tribe of Judah" — Revelation 5.' },
            { id: 'u5l2-02', audio: 'items/u5l2-02.mp3', kind: 'word', tsw: 'phiri', eng: 'wolf / hyena', src: 'beibele', cls: 9, plural: 'diphiri', note: 'The danger in "sheep among wolves" — Matthew 10. Setswana phiri covers wolf and hyena.' },
            { id: 'u5l2-03', audio: 'items/u5l2-03.mp3', kind: 'word', tsw: 'noga', eng: 'snake', src: 'beibele', cls: 9, plural: 'dinoga', note: 'noga e e nang le botlhole = a venomous snake (Matthew 7).' },
            { id: 'u5l2-04', audio: 'items/u5l2-04.mp3', kind: 'word', tsw: 'nonyane', eng: 'bird', src: 'beibele', cls: 9, plural: 'dinonyane', note: 'Bonang dinonyane! — "See the birds!" (Matthew 6).' },
            { id: 'u5l2-05', audio: 'items/u5l2-05.mp3', kind: 'word', tsw: 'tlhapi', eng: 'fish', src: 'beibele', cls: 9, plural: 'ditlhapi', note: 'From "if he asks for a fish…" — Matthew 7.' },
            { id: 'u5l2-06', audio: 'items/u5l2-06.mp3', kind: 'word', tsw: 'kammele', eng: 'camel', src: 'beibele', cls: 9, plural: 'dikammele', note: 'The one that can\'t fit through a needle\'s eye — Matthew 19.' },
            { id: 'u5l2-07', audio: 'items/u5l2-07.mp3', kind: 'word', tsw: 'lephoi', eng: 'dove', src: 'beibele', cls: 5, plural: 'maphoi', note: 'A le-/ma- word, not class 9: lephoi → maphoi. "Harmless as doves" — Matthew 10.' }
          ]
        },
        {
          id: 'u5l3', title: 'Go bala ka diphologolo', blurb: 'A little reading: sentences about the animals you\'ve met. Read them, then show you understood.',
          items: [
            { id: 'u5l3-00', kind: 'rule', tsw: '', eng: '', src: 'grammar-toolkit', rule: 'Time to read. Every sentence below is about an animal, and every word in it you already know. Read the Setswana first and try to hear the meaning before you flip it. The drills after will check you understood — that\'s your comprehension test, built from these very sentences.' },
            { id: 'u5l3-01', audio: 'items/u2l5-07.mp3', kind: 'phrase', tsw: 'Dikgomo di bogale', eng: 'The cows are fierce', src: 'pc-comp-grammar-ch2', concordSlot: { head: 'Dikgomo', answer: 'di', options: ['di', 'ba', 'e', 'a'], tail: 'bogale', hint: 'cows — class 10' }, note: 'You read this in Unit 2 — here it is again, as reading practice.' },
            { id: 'u5l3-02', audio: 'items/u2l5-08.mp3', kind: 'phrase', tsw: 'Dikgomo di dintle', eng: 'The cows are beautiful', src: 'pc-comp-grammar-ch2', note: 'The weak adjective repeats the prefix: di + di-ntle.' },
            { id: 'u5l3-03', audio: 'items/u2l5-09.mp3', kind: 'phrase', tsw: 'Ke na le dikgomo tse dintle', eng: 'I have beautiful cows', src: 'pc-comp-grammar-ch4', note: 'Inside a phrase the adjective takes a linker: tse dintle.' },
            { id: 'u5l3-04', audio: 'items/u2l6-10.mp3', kind: 'phrase', tsw: 'Pitse e tshweu', eng: 'A white horse', src: 'beibele', concordSlot: { head: 'Pitse', answer: 'e', options: ['e', 'di', 'o', 'le'], tail: 'tshweu', hint: 'horse — class 9' }, note: 'Straight out of Revelation 6.' },
            { id: 'u5l3-05', audio: 'items/u2l6-11.mp3', kind: 'phrase', tsw: 'Pitse e ntsho', eng: 'A black horse', src: 'beibele', note: 'And Revelation 6\'s black horse.' },
            { id: 'u5l3-06', audio: 'items/u5l3-06.mp3', kind: 'phrase', tsw: 'Bonang dinonyane!', eng: 'See the birds!', src: 'beibele', note: 'Verbatim, Matthew 6:26 — Bonang dinonyane! go bona = to see (Unit 1), now as a command to a group: Bonang.' },
            { id: 'u5l3-07', audio: 'items/u5l3-07.mp3', kind: 'phrase', tsw: 'Ke na le dinku le dipodi', eng: 'I have sheep and goats', src: 'beibele+peace-corps-L11', note: 'Built from Ke na le (I have, Unit 1) + dinku le dipodi (sheep and goats, Matthew 25) — all sourced. le = and.' },
            { id: 'u5l3-08', audio: 'items/u5l3-08.mp3', kind: 'phrase', tsw: 'Dikgomo di dintsi', eng: 'The cattle are many', src: 'pc-comp-grammar-ch2+beibele', note: 'dintsi = many (you met dilo tse dintsi in Unit 3). The cattle are many.' }
          ]
        },
        {
          id: 'u5l4', title: 'Maele a diphologolo', blurb: 'Setswana paints with animals: wise as a snake, the Lion of the tribe. Figures of speech you can read.',
          items: [
            { id: 'u5l4-00', kind: 'rule', tsw: '', eng: '', src: 'grammar-toolkit', rule: 'A maele (idiom) says one thing to mean another — Setswana reaches for animals constantly, because cattle and the veld sit at the heart of the culture. What follows here is Biblical figurative animal language, not the module\'s own traditional maele: real figures of speech — to be "wise as a snake", to be sent out "as sheep among wolves", to call a leader "the Lion of the tribe" — each one honestly sourced, never invented. You can\'t work out an idiom\'s meaning from its words alone, so each card carries what it actually means. The module\'s real maele list — the traditional Setswana idioms this outcome is really asking for — will come from the Smart Guide once it lands.' },
            { id: 'u5l4-01', audio: 'items/u5l4-01.mp3', kind: 'phrase', tsw: 'Nnang botlhale jaaka dinoga', eng: 'Be wise as snakes', src: 'beibele', note: 'Verbatim, Matthew 10:16 — Biblical figurative language, not a traditional maele. jaaka = like/as (Unit 4). The snake here is a picture of cleverness, not danger.' },
            { id: 'u5l4-02', audio: 'items/u5l4-02.mp3', kind: 'phrase', tsw: 'bori jaaka maphoi', eng: 'harmless as doves', src: 'beibele', note: 'The other half of Matthew 10:16 — paired with the snake: clever, yet gentle. Biblical figurative language.' },
            { id: 'u5l4-03', audio: 'items/u5l4-03.mp3', kind: 'phrase', tsw: 'Ke lo roma jaaka dinku mo gare ga diphiri', eng: 'I send you out as sheep among wolves', src: 'beibele', note: 'Verbatim, Matthew 10:16 — being sent somewhere risky, defenceless. dinku = sheep, diphiri = wolves. Biblical figurative language.' },
            { id: 'u5l4-04', audio: 'items/u5l4-04.mp3', kind: 'phrase', tsw: 'Tau ya lotso lwa Juda', eng: 'The Lion of the tribe of Judah', src: 'beibele', note: 'Verbatim, Revelation 5:5. Calling someone tau (a lion) is the highest praise — strength and rule, the animal-praise-name pattern. Biblical figurative language.' },
            { id: 'u5l4-05', audio: 'items/u5l4-05.mp3', kind: 'phrase', tsw: 'Ke Modisa yo o Molemo', eng: 'I am the good shepherd', src: 'beibele', note: 'Verbatim, John 10:11. modisa = shepherd (of dinku, sheep) — the caring-leader picture, the flip side of the wolf. Biblical figurative language.' }
          ]
        },
        {
          id: 'u5l5', title: 'Go ranola', blurb: 'Turn it around: Setswana into English and back. Read it, then write it out.',
          items: [
            { id: 'u5l5-00', kind: 'rule', tsw: '', eng: '', src: 'grammar-toolkit', rule: 'go ranola = to translate. There\'s nothing new to learn here — every word is one you know. The drills flip each sentence both ways (Setswana ⇄ English), and once a sentence is familiar the app will ask you to WRITE it out, not just tap it. That is your writing practice: small, correct sentences about animals.' },
            { id: 'u5l5-01', audio: 'items/u5l5-01.mp3', kind: 'phrase', tsw: 'Ke na le podi', eng: 'I have a goat', src: 'peace-corps-L11+beibele', note: 'Ke na le (I have, Unit 1) + podi (goat). Your first sentence to write from memory.' },
            { id: 'u5l5-02', audio: 'items/u5l5-02.mp3', kind: 'phrase', tsw: 'Ke na le ntša', eng: 'I have a dog', src: 'peace-corps-L11+beibele', note: 'Same frame, new animal: swap podi for ntša.' },
            { id: 'u5l5-03', audio: 'items/u5l5-03.mp3', kind: 'phrase', tsw: 'Ke bona nonyane', eng: 'I see a bird', src: 'peace-corps-L4+beibele', note: 'go bona = to see (Ke tla go bona, Unit 1) + nonyane (bird).' },
            { id: 'u5l5-04', audio: 'items/u5l5-04.mp3', kind: 'phrase', tsw: 'Nku e ntsho', eng: 'A black sheep', src: 'beibele', concordSlot: { head: 'Nku', answer: 'e', options: ['e', 'di', 'o', 'le'], tail: 'ntsho', hint: 'sheep — class 9' }, note: 'Same class-9 colour pattern as pitse e ntsho — the concord e + the stem ntsho.' },
            { id: 'u5l5-05', audio: 'items/u5l5-05.mp3', kind: 'phrase', tsw: 'Dintša di bogale', eng: 'The dogs are fierce', src: 'pc-comp-grammar-ch2+beibele', note: 'The exact shape of Dikgomo di bogale, now with dogs: subject marker di + bogale.' },
            { id: 'u5l5-06', audio: 'items/u5l5-06.mp3', kind: 'phrase', tsw: 'Ke rata diphologolo', eng: 'I like animals', src: 'peace-corps-L6+beibele', note: 'Ke rata (I like, Unit 1 — Ke rata nama) + diphologolo (animals). A sentence to close the unit on.' }
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
  {id: 'nchlt_tsn_120m_0170', tsw: 'dikoko jalo jalo pele pele', audio: 'nchlt/nchlt_tsn_120m_0170.mp3', spk: '120 (male, -1, gauteng)'},
  {id: 'nchlt_tsn_177m_0531', tsw: 'mang eng kae leng jang', audio: 'nchlt/nchlt_tsn_177m_0531.mp3', spk: '177 (male, -1, gauteng)'},
  {id: 'nchlt_tsn_163m_0336', tsw: 'dumela mma lo tsoga jang', audio: 'nchlt/nchlt_tsn_163m_0336.mp3', spk: '163 (male, -1, gauteng)'},
  {id: 'nchlt_tsn_162m_0352', tsw: 'leina la gagwe kgotsa la', audio: 'nchlt/nchlt_tsn_162m_0352.mp3', spk: '162 (male, -1, gauteng)'},
  {id: 'nchlt_tsn_125f_0328', tsw: 'wena dira jaaka motho yo', audio: 'nchlt/nchlt_tsn_125f_0328.mp3', spk: '125 (female, -1, gauteng)'},
  {id: 'nchlt_tsn_107f_0018', tsw: 're leng batho mme nna', audio: 'nchlt/nchlt_tsn_107f_0018.mp3', spk: '107 (female, -1, gauteng)'},
  {id: 'nchlt_tsn_066f_0494', tsw: 'motho thata ya go reka', audio: 'nchlt/nchlt_tsn_066f_0494.mp3', spk: '066 (female, 19, gauteng)'},
  {id: 'nchlt_tsn_140m_0217', tsw: 'nngwe morago ga gore motho', audio: 'nchlt/nchlt_tsn_140m_0217.mp3', spk: '140 (male, -1, gauteng)'},
  {id: 'nchlt_tsn_135f_0234', tsw: 'baithuti pele ga ba dira', audio: 'nchlt/nchlt_tsn_135f_0234.mp3', spk: '135 (female, -1, gauteng)'},
  {id: 'nchlt_tsn_090f_0573', tsw: 'leina la gago le a', audio: 'nchlt/nchlt_tsn_090f_0573.mp3', spk: '090 (female, -1, gauteng)'},
  {id: 'nchlt_tsn_098m_0780', tsw: 'ya bana morago ga sekolo', audio: 'nchlt/nchlt_tsn_098m_0780.mp3', spk: '098 (male, 39, gauteng)'},
  {id: 'nchlt_tsn_091f_0341', tsw: 'nngwe le nngwe e ja', audio: 'nchlt/nchlt_tsn_091f_0341.mp3', spk: '091 (female, 27, gauteng)'},
  {id: 'nchlt_tsn_173m_0351', tsw: 'mogolo kgotsa moithuti yo mogolo', audio: 'nchlt/nchlt_tsn_173m_0351.mp3', spk: '173 (male, -1, gauteng)'},
  {id: 'nchlt_tsn_107f_0421', tsw: 'leitlho yo montle yo ene', audio: 'nchlt/nchlt_tsn_107f_0421.mp3', spk: '107 (female, -1, gauteng)'},
  {id: 'nchlt_tsn_117m_0295', tsw: 'gagwe letsogo mme rona re', audio: 'nchlt/nchlt_tsn_117m_0295.mp3', spk: '117 (male, -1, gauteng)'},
  {id: 'nchlt_tsn_175f_0245', tsw: 'a a jalo maina a', audio: 'nchlt/nchlt_tsn_175f_0245.mp3', spk: '175 (female, -1, gauteng)'},
  {id: 'nchlt_tsn_064f_0452', tsw: 'sa go nna teng ga', audio: 'nchlt/nchlt_tsn_064f_0452.mp3', spk: '064 (female, 17, gauteng)'},
  {id: 'nchlt_tsn_072m_0329', tsw: 'e ka nna ya dira', audio: 'nchlt/nchlt_tsn_072m_0329.mp3', spk: '072 (male, 18, gauteng)'},
  {id: 'nchlt_tsn_168f_0577', tsw: 're tla tsoga re bona', audio: 'nchlt/nchlt_tsn_168f_0577.mp3', spk: '168 (female, -1, gauteng)'},
  {id: 'nchlt_tsn_155f_0276', tsw: 'di le thataro morago ga', audio: 'nchlt/nchlt_tsn_155f_0276.mp3', spk: '155 (female, -1, gauteng)'},
  {id: 'nchlt_tsn_130f_0429', tsw: 're bona jaaka lo batla', audio: 'nchlt/nchlt_tsn_130f_0429.mp3', spk: '130 (female, -1, gauteng)'},
  {id: 'nchlt_tsn_087f_0496', tsw: 'nnang mo go lona le', audio: 'nchlt/nchlt_tsn_087f_0496.mp3', spk: '087 (female, 35, gauteng)'},
  {id: 'nchlt_tsn_096m_0341', tsw: 'go reka dijo tse di', audio: 'nchlt/nchlt_tsn_096m_0341.mp3', spk: '096 (male, 20, gauteng)'},
  {id: 'nchlt_tsn_079m_0003', tsw: 'sa madi kgotsa madi mo', audio: 'nchlt/nchlt_tsn_079m_0003.mp3', spk: '079 (male, 20, gauteng)'},
  {id: 'nchlt_tsn_151f_0322', tsw: 'wa rona ke batho ba', audio: 'nchlt/nchlt_tsn_151f_0322.mp3', spk: '151 (female, -1, gauteng)'},
  {id: 'nchlt_tsn_029m_0227', tsw: 'dibeke di le thataro go', audio: 'nchlt/nchlt_tsn_029m_0227.mp3', spk: '029 (male, 22, north west)'},
  {id: 'nchlt_tsn_113f_0194', tsw: 'maina a batho ba ba', audio: 'nchlt/nchlt_tsn_113f_0194.mp3', spk: '113 (female, -1, gauteng)'},
  {id: 'nchlt_tsn_024m_0503', tsw: 'moithuti mo sekolong sa mo', audio: 'nchlt/nchlt_tsn_024m_0503.mp3', spk: '024 (male, 23, north west)'},
  {id: 'nchlt_tsn_138f_0213', tsw: 'baithuti ba itse se se', audio: 'nchlt/nchlt_tsn_138f_0213.mp3', spk: '138 (female, -1, gauteng)'},
  {id: 'nchlt_tsn_047m_0501', tsw: 'e e ka nnang teng', audio: 'nchlt/nchlt_tsn_047m_0501.mp3', spk: '047 (male, 25, north west)'},
  {id: 'nchlt_tsn_022m_0008', tsw: 'dibeke di le pedi go', audio: 'nchlt/nchlt_tsn_022m_0008.mp3', spk: '022 (male, -1, north west)'},
  {id: 'nchlt_tsn_178f_0279', tsw: 'tla tsoga re bona gore', audio: 'nchlt/nchlt_tsn_178f_0279.mp3', spk: '178 (female, -1, gauteng)'},
  {id: 'nchlt_tsn_118f_0258', tsw: 'go ruta le go ithuta', audio: 'nchlt/nchlt_tsn_118f_0258.mp3', spk: '118 (female, -1, gauteng)'},
  {id: 'nchlt_tsn_086f_0460', tsw: 'teng ga madi se se', audio: 'nchlt/nchlt_tsn_086f_0460.mp3', spk: '086 (female, 33, gauteng)'},
  {id: 'nchlt_tsn_079m_0469', tsw: 'o ka nne wa kopa', audio: 'nchlt/nchlt_tsn_079m_0469.mp3', spk: '079 (male, 20, gauteng)'},
  {id: 'nchlt_tsn_135f_0252', tsw: 'leboga re lo leboga jaaka', audio: 'nchlt/nchlt_tsn_135f_0252.mp3', spk: '135 (female, -1, gauteng)'},
  {id: 'nchlt_tsn_130f_0203', tsw: 'letsogo mme rona re tla', audio: 'nchlt/nchlt_tsn_130f_0203.mp3', spk: '130 (female, -1, gauteng)'},
  {id: 'nchlt_tsn_186f_0178', tsw: 're batla thuso re tla', audio: 'nchlt/nchlt_tsn_186f_0178.mp3', spk: '186 (female, -1, gauteng)'},
  {id: 'nchlt_tsn_102m_0160', tsw: 'ga ke itse gore wena', audio: 'nchlt/nchlt_tsn_102m_0160.mp3', spk: '102 (male, -1, gauteng)'}
];
