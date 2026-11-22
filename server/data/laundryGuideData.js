export const laundryGuideData = [
  // 1. 물세탁 (WASH)
  {
    id: 'wash-95',
    category: 'wash',
    categoryName: '물세탁',
    code: 'WASH_95',
    name: '95℃ 세탁기 (삶는 세탁 가능)',
    meaning: '물 온도 95℃까지 세탁기에서 세탁할 수 있으며, 고온 삶는 세탁이 가능합니다.',
    guide: '오염이 심한 흰색 면직물, 면 기저귀, 수건, 행주 등의 위생 살균 세탁에 적합합니다.',
    cautions: '색상이 있는 의류나 열에 약한 합성섬유, 탄성 섬유(스판덱스)는 수축 및 이염 위험이 있으므로 피하세요.',
    standard: 'KS K 0021 / ISO 3758',
    keywords: ['물세탁', '95도', '삶기', '고온', '면', '수건', '살균', '표준']
  },
  {
    id: 'wash-60',
    category: 'wash',
    categoryName: '물세탁',
    code: 'WASH_60',
    name: '60℃ 세탁기 세탁 (표준 코스)',
    meaning: '물 온도 60℃까지 세탁기에서 일반 세탁이 가능합니다.',
    guide: '침구류, 시트, 속옷, 오염된 면 의류 세탁에 추천되며 진드기 및 유기물 제거에 효과적입니다.',
    cautions: '원단 종류에 따라 약간의 수축이 발생할 수 있으니 진한 색상은 단독 세탁하세요.',
    standard: 'KS K 0021 / ISO 3758',
    keywords: ['물세탁', '60도', '표준', '침구', '면', '세탁기']
  },
  {
    id: 'wash-40-normal',
    category: 'wash',
    categoryName: '물세탁',
    code: 'WASH_40_NORMAL',
    name: '40℃ 세탁기 세탁 (표준)',
    meaning: '물 온도 40℃로 세탁기에서 일반적인 표준 강도로 세탁할 수 있습니다.',
    guide: '일반적인 일상 의류(티셔츠, 청바지, 맨투맨, 셔츠 등)에 가장 널리 사용되는 기본 코스입니다.',
    cautions: '짙은 색상의 옷은 이염 방지를 위해 밝은 색과 분리하여 세탁하세요.',
    standard: 'KS K 0021 / ISO 3758',
    keywords: ['물세탁', '40도', '표준', '일상복', '티셔츠', '바지']
  },
  {
    id: 'wash-40-gentle',
    category: 'wash',
    categoryName: '물세탁',
    code: 'WASH_40_GENTLE',
    name: '40℃ 약하게 (울/섬세 코스)',
    meaning: '물 온도 40℃ 이하에서 세탁기 약한 수류(울코스/섬세코스)로 세탁해야 합니다.',
    guide: '합성섬유 혼방, 블라우스, 얇은 니트 등 마찰에 약한 의류에 적합하며 세탁망 사용을 권장합니다.',
    cautions: '강한 탈수는 옷감 손상을 유발하므로 탈수 시간을 짧게 설정하세요.',
    standard: 'KS K 0021 / ISO 3758',
    keywords: ['물세탁', '40도', '약하게', '울코스', '섬세', '세탁망', '밑줄1줄']
  },
  {
    id: 'wash-30-very-gentle',
    category: 'wash',
    categoryName: '물세탁',
    code: 'WASH_30_VERY_GENTLE',
    name: '30℃ 매우 약하게 (극섬세 코스)',
    meaning: '물 온도 30℃ 이하의 찬물에서 매우 약한 힘(울/란제리 코스)으로 세탁해야 합니다.',
    guide: '중성세제를 사용하고 세탁망에 넣어 가장 부드러운 코스로 짧게 세탁하세요.',
    cautions: '비틀어 짜지 말고 원심 탈수는 최단 시간으로 가볍게 진행하세요.',
    standard: 'KS K 0021 / ISO 3758',
    keywords: ['물세탁', '30도', '찬물', '매우약하게', '란제리', '밑줄2줄']
  },
  {
    id: 'wash-hand',
    category: 'wash',
    categoryName: '물세탁',
    code: 'WASH_HAND',
    name: '손세탁 권장 (30℃ 중성세제)',
    meaning: '세탁기 사용을 금지하고, 30℃ 이하의 물에서 손으로 부드럽게 세탁해야 합니다.',
    guide: '미온수에 중성세제(울샴푸)를 푼 후 의류를 담가 손으로 조물조물 부드럽게 눌러 빨아줍니다.',
    cautions: '세탁기 세탁 절대 금지. 심하게 비비거나 비틀어 짜면 원단이 늘어나거나 변형됩니다.',
    standard: 'KS K 0021 / ISO 3758',
    keywords: ['물세탁', '손세탁', '울샴푸', '중성세제', '손빨래', '세탁기금지']
  },
  {
    id: 'wash-prohibited',
    category: 'wash',
    categoryName: '물세탁',
    code: 'WASH_NO',
    name: '물세탁 금지',
    meaning: '물에 닿으면 원단이 수축, 변형, 탈색되므로 어떠한 형태의 물세탁도 불가능합니다.',
    guide: '물세탁 대신 전문 세탁소에 맡겨 드라이클리닝을 진행해야 합니다.',
    cautions: '가정에서 물이나 얼룩제거제를 직접 바를 경우 원단에 영구적인 얼룩이나 휨이 발생합니다.',
    standard: 'KS K 0021 / ISO 3758',
    keywords: ['물세탁금지', '물금지', '드라이권장', '수축위험', 'X표시']
  },

  // 2. 표백 (BLEACH)
  {
    id: 'bleach-all',
    category: 'bleach',
    categoryName: '표백',
    code: 'BLEACH_ALL',
    name: '모든 표백제 사용 가능 (염소계/산소계)',
    meaning: '락스 등 염소계 표백제와 과탄산소다 등 산소계 표백제를 모두 사용할 수 있습니다.',
    guide: '오염 제거 및 흰색 유지 목적으로 권장 희석 배율에 맞추어 표백제를 사용하세요.',
    cautions: '희석하지 않은 원액을 직접 원단에 붓지 마세요. 금속 부속(지퍼, 단추)은 부식될 수 있습니다.',
    standard: 'KS K 0021 / ISO 3758',
    keywords: ['표백', '세모', '염소계', '산소계', '락스', '과탄산소다', '모두가능']
  },
  {
    id: 'bleach-oxygen-only',
    category: 'bleach',
    categoryName: '표백',
    code: 'BLEACH_OXYGEN_ONLY',
    name: '산소계 표백제만 가능 (염소계 금지)',
    meaning: '과탄산소다, 옥시크린 등 비염소계(산소계) 표백제만 사용 가능하며 락스(염소계)는 금지됩니다.',
    guide: '유색 옷의 찌든 때를 제거할 때 따뜻한 물에 산소계 표백제를 충분히 녹여 사용하세요.',
    cautions: '염소계 표백제(락스)를 사용하면 즉시 탈색 및 황변이 발생하므로 절대 사용하지 마세요.',
    standard: 'KS K 0021 / ISO 3758',
    keywords: ['표백', '산소계', '사선두줄', '염소계금지', '락스금지', '옥시크린']
  },
  {
    id: 'bleach-prohibited',
    category: 'bleach',
    categoryName: '표백',
    code: 'BLEACH_NO',
    name: '표백제 사용 금지',
    meaning: '염소계 표백제와 산소계 표백제를 포함한 모든 화학 표백제 사용이 금지됩니다.',
    guide: '일반 중성세제 또는 약알칼리성 기본 세탁 세제만을 사용하여 세탁하세요.',
    cautions: '세제 성분에 표백 활성제나 과탄산염이 포함되어 있는지 확인하고 사용하세요.',
    standard: 'KS K 0021 / ISO 3758',
    keywords: ['표백금지', '세모X', '표백불가', '탈색방지']
  },

  // 3. 건조 (DRY)
  {
    id: 'dry-tumble-high',
    category: 'dry',
    categoryName: '건조',
    code: 'TUMBLE_HIGH',
    name: '기계건조 가능 (80℃ 고온/표준)',
    meaning: '건조기(회전식 텀블건조기)를 사용하여 최고 80℃ 고온으로 정상 건조할 수 있습니다.',
    guide: '수건, 두꺼운 면 제품 등 고온 건조에 강한 의류에 적합합니다.',
    cautions: '과도하게 오랜 시간 건조하면 원단 마모가 빨라질 수 있으니 적정 시간만 건조하세요.',
    standard: 'KS K 0021 / ISO 3758',
    keywords: ['건조', '건조기', '텀블건조', '80도', '고온', '점2개']
  },
  {
    id: 'dry-tumble-low',
    category: 'dry',
    categoryName: '건조',
    code: 'TUMBLE_LOW',
    name: '기계건조 가능 (60℃ 저온/섬세)',
    meaning: '건조기 사용 시 배기온도 60℃ 이하의 저온(섬세/울 건조 모드)으로 건조해야 합니다.',
    guide: '열에 민감한 기능성 의류나 합성섬유 의류는 저온 건조 모드로 짧게 건조하세요.',
    cautions: '고온으로 건조할 경우 옷의 크기가 줄어들거나 탄성 밴드가 손상될 수 있습니다.',
    standard: 'KS K 0021 / ISO 3758',
    keywords: ['건조', '건조기', '저온건조', '60도', '섬세건조', '점1개']
  },
  {
    id: 'dry-tumble-no',
    category: 'dry',
    categoryName: '건조',
    code: 'TUMBLE_NO',
    name: '기계건조(텀블건조) 금지',
    meaning: '회전식 열풍 건조기(의류건조기) 사용이 엄격히 금지됩니다.',
    guide: '건조기 대신 옷걸이나 건조대에 널어 자연 건조(자연풍) 하세요.',
    cautions: '건조기에 넣을 시 급격한 수축, 지퍼 뒤틀림, 프린팅 갈라짐, 원단 손상이 발생합니다.',
    standard: 'KS K 0021 / ISO 3758',
    keywords: ['건조기금지', '자연건조', '수축주의', '텀블금지', '네모원X']
  },
  {
    id: 'dry-line-sun',
    category: 'dry',
    categoryName: '건조',
    code: 'DRY_LINE_SUN',
    name: '옷걸이에 걸어 햇빛 건조',
    meaning: '옷걸이에 걸어 직사광선이 닿는 햇빛 아래에서 건조합니다.',
    guide: '흰색 면의류, 수건 등 햇빛 살균과 빠른 건조가 필요한 의류에 좋습니다.',
    cautions: '유색 의류는 강한 햇빛에 장시간 노출 시 자외선으로 인한 탈색이 일어날 수 있습니다.',
    standard: 'KS K 0021 / ISO 3758',
    keywords: ['자연건조', '옷걸이', '햇빛', '라인건조']
  },
  {
    id: 'dry-line-shade',
    category: 'dry',
    categoryName: '건조',
    code: 'DRY_LINE_SHADE',
    name: '옷걸이에 걸어 그늘 건조',
    meaning: '직사광선을 피해 통풍이 잘되는 그늘에서 옷걸이에 걸어 말립니다.',
    guide: '색상이 있는 셔츠, 블라우스, 티셔츠 등의 변색을 방지하며 건조할 때 사용합니다.',
    cautions: '습기가 차서 냄새가 나지 않도록 바람이 잘 통하는 곳에 널어두세요.',
    standard: 'KS K 0021 / ISO 3758',
    keywords: ['자연건조', '그늘', '옷걸이', '탈색방지', '사선']
  },
  {
    id: 'dry-flat-shade',
    category: 'dry',
    categoryName: '건조',
    code: 'DRY_FLAT_SHADE',
    name: '바닥에 뉘어서 그늘 건조',
    meaning: '평평한 건조대나 바닥에 펼쳐놓고 직사광선을 피해 그늘에서 건조합니다.',
    guide: '니트, 스웨터, 카디건 등 물을 머금었을 때 무게로 늘어나기 쉬운 모(Wool) 의류에 필수적입니다.',
    cautions: '옷걸이에 걸면 어깨가 솟아오르거나 전체 길이가 늘어나 원형이 복구되지 않습니다.',
    standard: 'KS K 0021 / ISO 3758',
    keywords: ['뉘어서건조', '니트건조', '스웨터', '늘어남방지', '그늘건조', '수평선']
  },
  {
    id: 'dry-wring-no',
    category: 'dry',
    categoryName: '건조',
    code: 'WRING_NO',
    name: '비틀어 짜기 금지',
    meaning: '손으로 세게 비틀어 짜지 말아야 합니다.',
    guide: '마른 타월 사이에 의류를 넣고 꾹꾹 눌러 물기를 흡수시킨 후 건조하세요.',
    cautions: '비틀어 짤 경우 섬유 조직이 찢어지거나 구김이 깊게 패여 다림질로도 펴지지 않습니다.',
    standard: 'KS K 0021 / ISO 3758',
    keywords: ['비틀어짜기금지', '탈수주의', '타월건조']
  },

  // 4. 다림질 (IRON)
  {
    id: 'iron-high',
    category: 'iron',
    categoryName: '다림질',
    code: 'IRON_200',
    name: '고온 다림질 (180~200℃, 점 3개)',
    meaning: '다리미 온도를 180~200℃ 고온으로 설정하여 다림질할 수 있습니다.',
    guide: '면, 마(린넨) 등 열에 강하고 구김이 잘 생기는 천연 식물성 섬유에 적합하며 스팀 사용이 가능합니다.',
    cautions: '합성섬유가 조금이라도 섞여 있으면 녹아내릴 수 있으니 혼용률을 먼저 확인하세요.',
    standard: 'KS K 0021 / ISO 3758',
    keywords: ['다림질', '고온', '200도', '면', '린넨', '점3개', '스팀']
  },
  {
    id: 'iron-medium',
    category: 'iron',
    categoryName: '다림질',
    code: 'IRON_150',
    name: '중온 다림질 (140~160℃, 점 2개)',
    meaning: '다리미 온도를 140~160℃ 중간 온도로 설정하여 다림질합니다.',
    guide: '양모(울), 실크 혼방, 폴리에스테르, 레이온 등의 일상복 셔츠와 슬랙스에 알맞습니다.',
    cautions: '원단 표면의 번들거림을 방지하기 위해 얇은 면 손수건이나 다림질용 천을 덧대는 것이 안전합니다.',
    standard: 'KS K 0021 / ISO 3758',
    keywords: ['다림질', '중온', '150도', '울', '폴리에스터', '점2개']
  },
  {
    id: 'iron-low',
    category: 'iron',
    categoryName: '다림질',
    code: 'IRON_110',
    name: '저온 다림질 (80~120℃, 점 1개)',
    meaning: '다리미 온도를 80~120℃ 낮은 온도로 설정하고 스팀 없이 다림질합니다.',
    guide: '나일론, 아크릴, 폴리우레탄, 아세테이트 등 열에 취약한 합성섬유 의류에 사용합니다.',
    cautions: '스팀 기능은 원단 수축이나 얼룩을 유발할 수 있으므로 끄고, 다리미를 한자리에 오래 두지 마세요.',
    standard: 'KS K 0021 / ISO 3758',
    keywords: ['다림질', '저온', '110도', '나일론', '아크릴', '합성섬유', '점1개']
  },
  {
    id: 'iron-cloth',
    category: 'iron',
    categoryName: '다림질',
    code: 'IRON_CLOTH',
    name: '헝겊(천)을 덮고 다림질',
    meaning: '다리미 열판이 옷감 표면에 직접 닿지 않도록 반드시 위에 깨끗한 면 헝겊을 덮고 다려야 합니다.',
    guide: '열로 인한 원단 번들거림(테카리 현상)과 섬유 눌림 현상을 방지합니다.',
    cautions: '천 없이 직접 다리면 원단 표면이 타거나 반질반질하게 광택이 남아 옷이 망가집니다.',
    standard: 'KS K 0021 / ISO 3758',
    keywords: ['천덮고다림질', '헝겊', '번들거림방지', '울다림질']
  },
  {
    id: 'iron-no-steam',
    category: 'iron',
    categoryName: '다림질',
    code: 'IRON_NO_STEAM',
    name: '스팀 다림질 금지',
    meaning: '건식 다림질만 가능하며, 스팀(증기)을 분사해서는 안 됩니다.',
    guide: '스팀 버튼을 끄고 건식 다리미 모드로만 주름을 펴주세요.',
    cautions: '스팀에 닿으면 수축하거나 물 얼룩 자국이 영구적으로 남을 수 있습니다.',
    standard: 'KS K 0021 / ISO 3758',
    keywords: ['스팀금지', '건식다림질', '물얼룩주의']
  },
  {
    id: 'iron-prohibited',
    category: 'iron',
    categoryName: '다림질',
    code: 'IRON_NO',
    name: '다림질 금지',
    meaning: '열에 매우 취약하므로 어떠한 종류의 다림질도 할 수 없습니다.',
    guide: '세탁 후 젖은 상태에서 털어 주름을 정돈한 후 자연 건조하거나 옷걸이에 걸어 보관하세요.',
    cautions: '다리미를 대는 순간 섬유가 즉시 녹아붙어 구멍이 나거나 옷이 영구 파손됩니다.',
    standard: 'KS K 0021 / ISO 3758',
    keywords: ['다림질금지', '다리미X', '열금지', '패딩', '가죽', '퍼']
  },

  // 5. 드라이클리닝 (DRY CLEAN)
  {
    id: 'dryclean-all',
    category: 'dryclean',
    categoryName: '드라이클리닝',
    code: 'DRYCLEAN_YES',
    name: '드라이클리닝 가능',
    meaning: '유기용제를 사용하는 전문 드라이클리닝 세탁이 가능합니다.',
    guide: '가정 세탁 대신 전문 세탁소에 맡겨 드라이클리닝을 의뢰하세요.',
    cautions: '드라이클리닝 후 비닐 커버를 벗겨 잔류 기름 냄새와 휘발성 용제를 날린 후 옷장에 보관하세요.',
    standard: 'KS K 0021 / ISO 3758',
    keywords: ['드라이클리닝', '원형', '세탁소', '정장', '코트']
  },
  {
    id: 'dryclean-p',
    category: 'dryclean',
    categoryName: '드라이클리닝',
    code: 'DRYCLEAN_P',
    name: '전문 드라이클리닝 (퍼클로로에틸렌 / 탄화수소계)',
    meaning: '원 안에 P가 적힌 기호로, 퍼클로로에틸렌 및 석유계 용제를 사용한 전문 세탁이 가능합니다.',
    guide: '일반적인 고급 의류, 코트, 모직 정장 등에 널리 쓰이는 표준 드라이클리닝 규격입니다.',
    cautions: '가정에서 물세탁 시 원단 축소율이 크므로 세탁소 전문가에게 의뢰하세요.',
    standard: 'KS K 0021 / ISO 3758',
    keywords: ['드라이클리닝', 'P', '퍼클로로에틸렌', '전문세탁']
  },
  {
    id: 'dryclean-f',
    category: 'dryclean',
    categoryName: '드라이클리닝',
    code: 'DRYCLEAN_F',
    name: '석유계 용제 드라이클리닝 (F)',
    meaning: '원 안에 F가 적힌 기호로, 탄화수소계(석유계) 용제만을 사용해야 합니다.',
    guide: '섬세한 실크, 고급 울, 가공 처리된 섬유 등 자극에 민감한 명품 의류에 지정됩니다.',
    cautions: '강한 합성용제를 사용할 경우 코팅이나 염색이 벗겨질 수 있으므로 석유계 전용 드라이를 요청하세요.',
    standard: 'KS K 0021 / ISO 3758',
    keywords: ['드라이클리닝', 'F', '석유계', '고급의류', '실크', '명품']
  },
  {
    id: 'dryclean-w',
    category: 'dryclean',
    categoryName: '드라이클리닝',
    code: 'WETCLEAN_W',
    name: '전문 웨트클리닝(습식 클리닝) 가능 (W)',
    meaning: '원 안에 W가 적힌 기호로, 세탁 전문가가 특수 물세탁 기법으로 세탁할 수 있습니다.',
    guide: '물세탁 표시가 금지되어 있어도 전문점의 친환경 웨트클리닝 공정으로 땀과 오염을 안전하게 제거할 수 있습니다.',
    cautions: '가정용 일반 물세탁과는 전혀 다른 공정이므로 가정에서 임의로 물세탁하지 마세요.',
    standard: 'KS K 0021 / ISO 3758',
    keywords: ['웨트클리닝', 'W', '전문물세탁', '친환경클리닝']
  },
  {
    id: 'dryclean-prohibited',
    category: 'dryclean',
    categoryName: '드라이클리닝',
    code: 'DRYCLEAN_NO',
    name: '드라이클리닝 금지',
    meaning: '유기용제에 의해 원단이 녹거나 방수/투습 코팅 및 프린트가 손상되므로 드라이클리닝을 절대 금지합니다.',
    guide: '고어텍스 등 기능성 아웃도어 의류, 수영복, 네오프렌, 인조가죽(PU) 등에 해당하며 지정된 물세탁을 하세요.',
    cautions: '드라이클리닝을 맡길 경우 방수 멤브레인이 분리되거나 가죽이 딱딱하게 굳어 옷이 완전히 망가집니다.',
    standard: 'KS K 0021 / ISO 3758',
    keywords: ['드라이클리닝금지', '원X', '드라이불가', '아웃도어', '고어텍스', '방수']
  }
];

export const sampleLabels = [
  {
    id: 'sample-1',
    title: '베이직 코튼 100% 티셔츠',
    subtitle: '일상적인 캐주얼 면 라벨',
    material: '면 100% (Cotton 100%)',
    image: '/samples/sample-cotton.svg',
    summary: '40℃ 세탁기 표준 세탁 및 산소계 표백 가능, 중온 다림질 권장',
    analysis: {
      isCareLabel: true,
      fabricInfo: '면 100% (Cotton)',
      overallSummary: '물온도 40℃에서 표준 세탁기로 편하게 세탁할 수 있는 면 의류입니다. 산소계 표백제 사용이 가능하며, 건조기는 저온에서 사용하거나 자연 건조를 권장합니다. 다림질은 140~160℃ 중온에서 깔끔하게 다듬을 수 있습니다.',
      keyCautions: [
        '염소계 표백제(락스)는 탈색을 유발하므로 절대 사용하지 마세요.',
        '고온 텀블 건조 시 원단 수축(약 3~5%)이 발생할 수 있으니 저온 건조 또는 자연 건조하세요.'
      ],
      symbols: [
        {
          category: 'wash',
          categoryName: '물세탁',
          symbolName: '40℃ 세탁기 세탁 (표준)',
          meaning: '물 온도 40℃로 일반 세탁기에서 표준 강도로 세탁할 수 있습니다.',
          recommendation: '일반 액상 세제를 사용하여 표준 코스로 세탁하세요.',
          caution: '진한 색상은 첫 1~2회 단독 세탁하여 이염을 방지하세요.',
          confidence: 'high',
          iconCode: 'WASH_40_NORMAL'
        },
        {
          category: 'bleach',
          categoryName: '표백',
          symbolName: '산소계 표백제만 가능 (비염소계)',
          meaning: '과탄산소다 등 산소계 표백제만 사용 가능하며 락스(염소계)는 금지됩니다.',
          recommendation: '찌든 때가 있을 때 따뜻한 물에 산소계 표백제를 녹여 애벌빨래하세요.',
          caution: '염소계 표백제 사용 시 즉시 부분 탈색됩니다.',
          confidence: 'high',
          iconCode: 'BLEACH_OXYGEN_ONLY'
        },
        {
          category: 'dry',
          categoryName: '건조',
          symbolName: '기계건조 가능 (60℃ 저온)',
          meaning: '건조기 사용 시 저온(60℃ 이하)으로 가볍게 건조해야 합니다.',
          recommendation: '자연 건조를 병행하거나 건조기 섬세/저온 코스를 선택하세요.',
          caution: '고온 건조 시 원단이 줄어들 수 있습니다.',
          confidence: 'high',
          iconCode: 'TUMBLE_LOW'
        },
        {
          category: 'iron',
          categoryName: '다림질',
          symbolName: '중온 다림질 (140~160℃)',
          meaning: '다리미 온도를 140~160℃로 맞춰 다림질할 수 있습니다.',
          recommendation: '구김이 심한 부위는 가벼운 스팀과 함께 다림질하세요.',
          caution: '옷에 프린팅이나 고무 나염이 있는 경우 안쪽에서 다리세요.',
          confidence: 'high',
          iconCode: 'IRON_150'
        },
        {
          category: 'dryclean',
          categoryName: '드라이클리닝',
          symbolName: '드라이클리닝 가능',
          meaning: '전문 세탁소에서 일반 드라이클리닝이 가능합니다.',
          recommendation: '가정 물세탁이 충분히 가능하므로 필수적인 경우에만 세탁소에 맡기세요.',
          caution: '물세탁만으로도 충분히 오염 제거가 가능합니다.',
          confidence: 'high',
          iconCode: 'DRYCLEAN_YES'
        }
      ]
    }
  },
  {
    id: 'sample-2',
    title: '메리노 울 니트 & 가디건',
    subtitle: '섬세한 천연 모직물 라벨',
    material: '울 80%, 캐시미어 20% (Merino Wool & Cashmere)',
    image: '/samples/sample-wool.svg',
    summary: '미온수 손세탁 또는 석유계 드라이클리닝, 건조기 절대 금지, 뉘어서 그늘 건조',
    analysis: {
      isCareLabel: true,
      fabricInfo: '울 80%, 캐시미어 20% (고급 모직물)',
      overallSummary: '천연 양모와 캐시미어 혼방 소재로 물과 마찰에 매우 민감합니다. 30℃ 이하 찬물에서 울 전용 중성세제로 가볍게 손세탁하거나 전문 세탁소에 F마크 드라이클리닝을 맡기세요. 건조기는 절대 금지이며 평평하게 뉘어서 그늘에 말려야 합니다.',
      keyCautions: [
        '일반 세탁기 고속 탈수 및 열풍 건조기 사용 시 심각한 축융(원단 뭉침 및 수축)으로 옷을 입지 못하게 됩니다.',
        '옷걸이에 걸어 말리면 니트 어깨가 늘어나므로 반드시 평평한 건조대에 뉘어서 말리세요.',
        '모든 표백제 사용 금지 (염소계/산소계 모두 불가).'
      ],
      symbols: [
        {
          category: 'wash',
          categoryName: '물세탁',
          symbolName: '손세탁 권장 (30℃ 중성세제)',
          meaning: '세탁기 사용 금지, 30℃ 이하 미온수에서 중성세제로 부드럽게 손빨래해야 합니다.',
          recommendation: '울샴푸를 푼 물에 5분 내외로 가볍게 주물러 빤 뒤 맑은 물에 헹구세요.',
          caution: '심하게 비비거나 회전식 세탁기에 넣지 마세요.',
          confidence: 'high',
          iconCode: 'WASH_HAND'
        },
        {
          category: 'bleach',
          categoryName: '표백',
          symbolName: '표백제 사용 금지',
          meaning: '염소계 및 산소계 표백제 사용이 엄격히 금지됩니다.',
          recommendation: '중성 액상 세제(울샴푸)만 사용하세요.',
          caution: '표백제 접촉 시 양모 단백질 섬유가 영구 파괴됩니다.',
          confidence: 'high',
          iconCode: 'BLEACH_NO'
        },
        {
          category: 'dry',
          categoryName: '건조',
          symbolName: '바닥에 뉘어서 그늘 건조 & 건조기 금지',
          meaning: '건조기 사용 불가. 바닥이나 평평한 건조대에 펼쳐 그늘에서 자연 건조합니다.',
          recommendation: '마른 수건으로 꾹꾹 눌러 물기를 제거한 뒤 평평하게 뉘어 건조하세요.',
          caution: '건조기 사용 시 아동복 크기로 줄어들 수 있습니다.',
          confidence: 'high',
          iconCode: 'DRY_FLAT_SHADE'
        },
        {
          category: 'iron',
          categoryName: '다림질',
          symbolName: '저온 다림질 (천 덮고 다림질)',
          meaning: '80~120℃ 낮은 온도에서 얇은 면 천을 덧대고 다림질합니다.',
          recommendation: '스팀 다리미를 옷에서 2~3cm 띄워 스팀만 쐬어주거나 헝겊을 덮고 살짝 누르세요.',
          caution: '다리미를 직접 대면 털이 눌려 번들거림이 생깁니다.',
          confidence: 'high',
          iconCode: 'IRON_CLOTH'
        },
        {
          category: 'dryclean',
          categoryName: '드라이클리닝',
          symbolName: '석유계 용제 드라이클리닝 (F)',
          meaning: '자극이 적은 석유계 용제를 사용하는 전문 세탁소 드라이클리닝이 가능합니다.',
          recommendation: '계절이 바뀌어 장기 보관하기 전 세탁소에 고급 드라이클리닝을 맡기세요.',
          caution: '강한 합성용제 드라이는 피하세요.',
          confidence: 'high',
          iconCode: 'DRYCLEAN_F'
        }
      ]
    }
  },
  {
    id: 'sample-3',
    title: '고어텍스 아웃도어 윈드재킷',
    subtitle: '방수/투습 기능성 테크웨어',
    material: '나일론 100% (GORE-TEX 3-Layer Membrane)',
    image: '/samples/sample-outdoor.svg',
    summary: '30℃ 약한 물세탁, 표백 금지, 드라이클리닝 절대 금지, 저온 건조기로 발수 복원',
    analysis: {
      isCareLabel: true,
      fabricInfo: '나일론 100% (GORE-TEX 방수 투습 멤브레인)',
      overallSummary: '방수·방풍·투습 기능성 멤브레인이 내장된 테크웨어 재킷입니다. 섬유유연제와 표백제를 일절 쓰지 말고 아웃도어 전용 중성세제로 30℃ 약하게 물세탁하세요. 드라이클리닝은 방수막을 녹이므로 절대 금지이며, 세탁 후 저온 텀블 건조(20분)를 거치면 발수 기능이 완벽히 복원됩니다.',
      keyCautions: [
        '드라이클리닝 절대 금지: 유기용제가 내부 방수 멤브레인을 용해하여 기능이 영구 상실됩니다.',
        '섬유유연제 절대 사용 금지: 미세 다공성 통기 구멍을 막아 땀 배출 투습 기능이 마비됩니다.',
        '가루세제와 표백제는 잔여물이 남아 방수막을 손상시킵니다.'
      ],
      symbols: [
        {
          category: 'wash',
          categoryName: '물세탁',
          symbolName: '30℃ 약하게 (아웃도어/기능성 코스)',
          meaning: '물 온도 30℃에서 약한 수류로 세탁기 세탁이 가능합니다.',
          recommendation: '지퍼와 벨크로(찍찍이)를 모두 채운 뒤 기능성 아웃도어 액상 세제로 세탁하세요.',
          caution: '섬유유연제 및 표백제 투입 절대 금지.',
          confidence: 'high',
          iconCode: 'WASH_30_VERY_GENTLE'
        },
        {
          category: 'bleach',
          categoryName: '표백',
          symbolName: '표백제 사용 금지',
          meaning: '모든 종류의 산소계, 염소계 표백제 사용이 금지됩니다.',
          recommendation: '기능성 의류 전용 세제만을 투입하세요.',
          caution: '표백 성분은 발수 코팅층을 박리시킵니다.',
          confidence: 'high',
          iconCode: 'BLEACH_NO'
        },
        {
          category: 'dry',
          categoryName: '건조',
          symbolName: '기계건조 가능 (60℃ 저온 텀블 건조)',
          meaning: '저온 건조기를 사용할 수 있으며, 열풍 처리가 외부 DWR 발수 코팅을 활성화합니다.',
          recommendation: '자연 건조 후 저온 건조기에서 약 20분간 돌려주면 발수 성능이 되살아납니다.',
          caution: '고온 건조는 심실링 테이프가 떨어질 수 있으니 저온을 유지하세요.',
          confidence: 'high',
          iconCode: 'TUMBLE_LOW'
        },
        {
          category: 'iron',
          categoryName: '다림질',
          symbolName: '저온 다림질 (천 덮고 스팀 없이)',
          meaning: '건조기가 없을 경우 얇은 수건을 덮고 저온(110℃)으로 다리면 발수성이 회복됩니다.',
          recommendation: '스팀 없이 마른 수건을 덧대어 가볍게 다려주세요.',
          caution: '직접 다리미를 대면 겉감이 녹아붙습니다.',
          confidence: 'high',
          iconCode: 'IRON_110'
        },
        {
          category: 'dryclean',
          categoryName: '드라이클리닝',
          symbolName: '드라이클리닝 절대 금지',
          meaning: '유기용제가 방수 멤브레인을 파괴하므로 드라이클리닝을 절대 해서는 안 됩니다.',
          recommendation: '오염이 심할 때도 반드시 전문 아웃도어 물세탁을 진행하세요.',
          caution: '세탁소에 맡길 때도 "드라이클리닝 금지 의류"임을 명시하세요.',
          confidence: 'high',
          iconCode: 'DRYCLEAN_NO'
        }
      ]
    }
  },
  {
    id: 'sample-4',
    title: '실크 100% 드레이프 블라우스',
    subtitle: '초고급 천연 견직물 라벨',
    material: '견 100% (Silk 100%)',
    image: '/samples/sample-silk.svg',
    summary: '드라이클리닝 전용 (물세탁 불가), 표백 금지, 저온 천 덮고 다림질',
    analysis: {
      isCareLabel: true,
      fabricInfo: '견 100% (Pure Silk)',
      overallSummary: '섬세하고 광택이 아름다운 순수 실크 소재로 물에 닿으면 얼룩이 남고 결이 거칠어집니다. 물세탁을 금지하고 반드시 전문 세탁소에 드라이클리닝을 맡기세요. 다림질이 필요할 때는 저온에서 뒷면에 얇은 천을 덮고 스팀 없이 조심스럽게 다려야 합니다.',
      keyCautions: [
        '물세탁 절대 금지: 물방울만 튀어도 지워지지 않는 물 얼룩(워터스팟)이 생깁니다.',
        '스팀 다리미 분사 금지: 수증기 응결수로 인해 원단 표면이 우그러집니다.',
        '직사광선에 장시간 노출되면 견사 단백질이 산화되어 황변이 일어납니다.'
      ],
      symbols: [
        {
          category: 'wash',
          categoryName: '물세탁',
          symbolName: '물세탁 금지',
          meaning: '가정에서의 세탁기 및 손세탁을 포함한 모든 물세탁이 불가능합니다.',
          recommendation: '착용 후 오염이 묻지 않도록 주의하고 전문 세탁소에 드라이클리닝을 맡기세요.',
          caution: '물에 닿으면 즉시 수축 및 얼룩이 발생합니다.',
          confidence: 'high',
          iconCode: 'WASH_NO'
        },
        {
          category: 'bleach',
          categoryName: '표백',
          symbolName: '표백제 사용 금지',
          meaning: '염소계 및 산소계 표백제 사용이 금지됩니다.',
          recommendation: '어떠한 표백 화학 약품도 사용하지 마세요.',
          caution: '실크 섬유가 녹아내리거나 심각한 변색이 일어납니다.',
          confidence: 'high',
          iconCode: 'BLEACH_NO'
        },
        {
          category: 'dry',
          categoryName: '건조',
          symbolName: '기계건조 금지 & 그늘 자연 건조',
          meaning: '건조기 사용 불가. 통풍이 잘되는 서늘한 그늘에서 옷걸이에 걸어 보관 건조합니다.',
          recommendation: '자외선이 닿지 않는 어두운 옷장이나 통풍구에 보관하세요.',
          caution: '햇빛 노출 시 누렇게 변색됩니다.',
          confidence: 'high',
          iconCode: 'TUMBLE_NO'
        },
        {
          category: 'iron',
          categoryName: '다림질',
          symbolName: '저온 다림질 (천 덮고 스팀 금지)',
          meaning: '110℃ 이하 저온에서 스팀 없이 면 천을 덧대어 다립니다.',
          recommendation: '옷을 뒤집어 안감 쪽에 깨끗한 천을 깔고 낮은 온도로 살짝 펴주세요.',
          caution: '스팀 분사 시 물방울 자국이 남습니다.',
          confidence: 'high',
          iconCode: 'IRON_110'
        },
        {
          category: 'dryclean',
          categoryName: '드라이클리닝',
          symbolName: '전문 드라이클리닝 (석유계 F 권장)',
          meaning: '실크 특성을 잘 아는 전문 세탁소에서 섬세한 드라이클리닝을 진행해야 합니다.',
          recommendation: '고급 실크 전용 클리닝을 의뢰하세요.',
          caution: '세탁 후 비닐을 벗겨 통풍시킨 후 실크 전용 옷걸이에 보관하세요.',
          confidence: 'high',
          iconCode: 'DRYCLEAN_F'
        }
      ]
    }
  }
];
