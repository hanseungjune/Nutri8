-- 🎯 정확한 음식 이미지 매칭 (동일한 이름만)
-- Supabase SQL Editor에서 실행하세요

-- ============================================
-- 🔄 1단계: 기존 이미지 모두 제거
-- ============================================
UPDATE meals SET photo_url = NULL;

-- ============================================
-- 📸 2단계: 각 음식별 정확한 이미지 매칭
-- ============================================

-- === 밥류 ===
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80' WHERE food_name = '공기밥';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=400&q=80' WHERE food_name = '비빔밥';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&q=80' WHERE food_name = '불고기덮밥';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80' WHERE food_name = '김치볶음밥';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400&q=80' WHERE food_name = '현미밥';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80' WHERE food_name = '잡곡밥';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&q=80' WHERE food_name = '회덮밥';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1626261682795-f0523a2e2c9f?w=400&q=80' WHERE food_name = '장어덮밥';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80' WHERE food_name = '육회비빔밥';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80' WHERE food_name = '낙지덮밥';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80' WHERE food_name = '우삼겹덮밥';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80' WHERE food_name = '새우볶음밥';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80' WHERE food_name = '오므라이스';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80' WHERE food_name = '짬뽕밥';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80' WHERE food_name = '카레라이스';

-- === 찌개/국/탕 ===
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1569050467447-ce7ad2b23744?w=400&q=80' WHERE food_name = '김치찌개';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=400&q=80' WHERE food_name = '된장찌개';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?w=400&q=80' WHERE food_name = '순두부찌개';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?w=400&q=80' WHERE food_name = '해물순두부';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80' WHERE food_name = '부대찌개';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1569050467447-ce7ad2b23744?w=400&q=80' WHERE food_name = '곱창전골';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1569050467447-ce7ad2b23744?w=400&q=80' WHERE food_name = '동태찌개';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1576021182211-9ea8dced3690?w=400&q=80' WHERE food_name = '삼계탕';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80' WHERE food_name = '닭볶음탕';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1569050467447-ce7ad2b23744?w=400&q=80' WHERE food_name = '닭도리탕';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80' WHERE food_name = '찜닭';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80' WHERE food_name = '된장국';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80' WHERE food_name = '미역국';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=400&q=80' WHERE food_name = '순대국';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=400&q=80' WHERE food_name = '돼지국밥';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=400&q=80' WHERE food_name = '소고기 국밥';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=400&q=80' WHERE food_name = '소고기무국';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&q=80' WHERE food_name = '갈비탕';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=400&q=80' WHERE food_name = '소갈비찜';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=400&q=80' WHERE food_name = '등갈비찜';

-- === 고기 ===
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1606479794875-d6257089cebe?w=400&q=80' WHERE food_name = '삼겹살';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&q=80' WHERE food_name = '불고기';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&q=80' WHERE food_name = '갈비';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&q=80' WHERE food_name = '양념갈비';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&q=80' WHERE food_name = 'LA갈비';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400&q=80' WHERE food_name = '제육볶음';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400&q=80' WHERE food_name = '닭갈비';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&q=80' WHERE food_name = '양념치킨';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400&q=80' WHERE food_name = '닭가슴살';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=400&q=80' WHERE food_name = '보쌈';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1615997583541-0e15c782c5d1?w=400&q=80' WHERE food_name = '족발';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=400&q=80' WHERE food_name = '쌈밥';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80' WHERE food_name = '오리고기';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80' WHERE food_name = '훈제오리';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80' WHERE food_name = '양고기';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&q=80' WHERE food_name = '스테이크';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?w=400&q=80' WHERE food_name = '닭발';

-- === 해산물 ===
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80' WHERE food_name = '연어';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80' WHERE food_name = '연어스테이크';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1580959375944-0be6b5ca5c3b?w=400&q=80' WHERE food_name = '생선구이';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1580959375944-0be6b5ca5c3b?w=400&q=80' WHERE food_name = '삼치구이';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1580959375944-0be6b5ca5c3b?w=400&q=80' WHERE food_name = '고등어구이';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1580959375944-0be6b5ca5c3b?w=400&q=80' WHERE food_name = '황태구이';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80' WHERE food_name = '해물찜';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80' WHERE food_name = '낙지볶음';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80' WHERE food_name = '쭈꾸미볶음';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80' WHERE food_name = '아구찜';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400&q=80' WHERE food_name = '갈치조림';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400&q=80' WHERE food_name = '코다리조림';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1554520735-0fd37dc8e00f?w=400&q=80' WHERE food_name = '물회';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1563612116625-3012372fccce?w=400&q=80' WHERE food_name = '간장게장';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1625938145312-c338a2c8220f?w=400&q=80' WHERE food_name = '낙곱새';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1625938145312-c338a2c8220f?w=400&q=80' WHERE food_name = '감바스';

-- === 면류 ===
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=400&q=80' WHERE food_name = '짜장면';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400&q=80' WHERE food_name = '짬뽕';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400&q=80' WHERE food_name = '매운짬뽕';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400&q=80' WHERE food_name = '해물짬뽕';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80' WHERE food_name = '라면';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?w=400&q=80' WHERE food_name = '우동';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400&q=80' WHERE food_name = '칼국수';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400&q=80' WHERE food_name = '해물칼국수';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&q=80' WHERE food_name = '쌀국수';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&q=80' WHERE food_name = '콩국수';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&q=80' WHERE food_name = '냉면';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&q=80' WHERE food_name = '비빔국수';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80' WHERE food_name = '파스타';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400&q=80' WHERE food_name = '돈코츠라멘';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400&q=80' WHERE food_name = '마라탕';

-- === 일식/돈까스 ===
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1623679448552-12f2f21b49ca?w=400&q=80' WHERE food_name = '돈까스';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1623679448552-12f2f21b49ca?w=400&q=80' WHERE food_name = '등심돈까스';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1623679448552-12f2f21b49ca?w=400&q=80' WHERE food_name = '치즈돈까스';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&q=80' WHERE food_name = '초밥';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&q=80' WHERE food_name = '스시';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&q=80' WHERE food_name = '유부초밥';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1625938145312-c338a2c8220f?w=400&q=80' WHERE food_name = '규카츠';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1625938145312-c338a2c8220f?w=400&q=80' WHERE food_name = '타코야키';

-- === 중식 ===
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&q=80' WHERE food_name = '탕수육';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1625938145312-c338a2c8220f?w=400&q=80' WHERE food_name = '훠궈';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1625938145312-c338a2c8220f?w=400&q=80' WHERE food_name = '월남쌈';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1625938145312-c338a2c8220f?w=400&q=80' WHERE food_name = '멘보샤';

-- === 분식/간식 ===
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&q=80' WHERE food_name = '떡볶이';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=400&q=80' WHERE food_name = '김밥';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&q=80' WHERE food_name = '만두';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&q=80' WHERE food_name = '해물파전';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80' WHERE food_name = '치킨';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80' WHERE food_name = '피자';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80' WHERE food_name = '햄버거';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80' WHERE food_name = '감자튀김';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80' WHERE food_name = '고로케';

-- === 죽/누룽지 ===
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1581879425887-0a1d6e6e8c5f?w=400&q=80' WHERE food_name = '죽';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1581879425887-0a1d6e6e8c5f?w=400&q=80' WHERE food_name = '단호박죽';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80' WHERE food_name = '누룽지';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400&q=80' WHERE food_name = '청국장';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400&q=80' WHERE food_name = '김치';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400&q=80' WHERE food_name = '김치찜';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80' WHERE food_name = '나물';

-- === 빵/토스트 ===
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80' WHERE food_name = '토스트';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80' WHERE food_name = '식빵';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80' WHERE food_name = '샌드위치';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1509365390695-33aeb2938bc5?w=400&q=80' WHERE food_name = '베이글';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1509365390695-33aeb2938bc5?w=400&q=80' WHERE food_name = '베이글크림치즈';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80' WHERE food_name = '크루아상';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1584182891596-c62e98b93fd0?w=400&q=80' WHERE food_name = '프렌치토스트';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1535473895227-bdecb20fb157?w=400&q=80' WHERE food_name = '팬케이크';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400&q=80' WHERE food_name = '와플';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80' WHERE food_name = '모닝빵';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80' WHERE food_name = '모닝빵세트';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1604085572504-a392e6d4e9df?w=400&q=80' WHERE food_name = '브리오슈';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&q=80' WHERE food_name = '잉글리쉬머핀';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1509365390695-33aeb2938bc5?w=400&q=80' WHERE food_name = '치아바타샌드위치';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1525351326368-efbb5cb6814d?w=400&q=80' WHERE food_name = '아보카도토스트';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1516100882582-96c3a05fe590?w=400&q=80' WHERE food_name = '누텔라토스트';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?w=400&q=80' WHERE food_name = '크로플';

-- === 계란 요리 ===
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400&q=80' WHERE food_name = '계란';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400&q=80' WHERE food_name = '계란후라이';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&q=80' WHERE food_name = '오믈렛';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400&q=80' WHERE food_name = '스크램블에그';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=400&q=80' WHERE food_name = '에그베네딕트';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400&q=80' WHERE food_name = '베이컨';

-- === 샐러드 ===
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80' WHERE food_name = '샐러드';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80' WHERE food_name = '치킨샐러드';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80' WHERE food_name = '과일샐러드';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80' WHERE food_name = '단호박샐러드';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80' WHERE food_name = '리코타치즈샐러드';

-- === 시리얼/그래놀라 ===
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=400&q=80' WHERE food_name = '시리얼';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=400&q=80' WHERE food_name = '콘프레이크';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80' WHERE food_name = '그래놀라';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80' WHERE food_name = '뮤즐리';

-- === 과일 ===
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&q=80' WHERE food_name = '바나나';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&q=80' WHERE food_name = '사과';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=400&q=80' WHERE food_name = '포도';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&q=80' WHERE food_name = '딸기';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400&q=80' WHERE food_name = '고구마';

-- === 간식/디저트 ===
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80' WHERE food_name = '아이스크림';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80' WHERE food_name = '케이크';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80' WHERE food_name = '치즈케이크';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&q=80' WHERE food_name = '쿠키';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&q=80' WHERE food_name = '초코칩쿠키';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1606312619070-d48b4a8e8f00?w=400&q=80' WHERE food_name = '초콜릿';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&q=80' WHERE food_name = '마카롱';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1623944889288-cd147dbb517c?w=400&q=80' WHERE food_name = '브라우니';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1566132127697-4524fea60007?w=400&q=80' WHERE food_name = '머핀';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1617873181673-4c144e1f7ea2?w=400&q=80' WHERE food_name = '시나몬롤';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&q=80' WHERE food_name = '츄러스';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400&q=80' WHERE food_name = '호두파이';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1595744375596-5f40e6d8574f?w=400&q=80' WHERE food_name = '에그타르트';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1565824683283-5b52d49e3c75?w=400&q=80' WHERE food_name = '카스테라';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1586198393344-d35dc1c2ca95?w=400&q=80' WHERE food_name = '단팥빵';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400&q=80' WHERE food_name = '찹쌀도넛';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&q=80' WHERE food_name = '약과';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&q=80' WHERE food_name = '꿀떡';

-- === 음료 ===
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80' WHERE food_name = '커피';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80' WHERE food_name = '아메리카노';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1545665225-b23b99e4d45e?w=400&q=80' WHERE food_name = '카라멜마끼아또';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80' WHERE food_name = '에스프레소';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1475045834145-4c7e9537956c?w=400&q=80' WHERE food_name = '녹차라떼';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1502462041640-b3ed0747a5bf?w=400&q=80' WHERE food_name = '우유';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80' WHERE food_name = '밀크쉐이크';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&q=80' WHERE food_name = '스무디';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&q=80' WHERE food_name = '망고스무디';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&q=80' WHERE food_name = '곡물쉐이크';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1558857563-b1d6d62d12af?w=400&q=80' WHERE food_name = '버블티';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1558857563-b1d6d62d12af?w=400&q=80' WHERE food_name = '사탕수수주스';

-- === 요거트 ===
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80' WHERE food_name = '요거트';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80' WHERE food_name = '그릭요거트';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80' WHERE food_name = '딸기요거트';

-- === 건강식/프로틴 ===
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1622484211851-f1f4e79c8dc6?w=400&q=80' WHERE food_name = '프로틴바';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1622484211851-f1f4e79c8dc6?w=400&q=80' WHERE food_name = '에너지바';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1599909308646-f2e1cc58c6e8?w=400&q=80' WHERE food_name = '견과류';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=400&q=80' WHERE food_name = '참치마요';

-- === 기타 한식 ===
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80' WHERE food_name = '브런치';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b9?w=400&q=80' WHERE food_name = '팝콘';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&q=80' WHERE food_name = '허니버터칩';
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1527424213527-b9b05a3f8e5b?w=400&q=80' WHERE food_name = '군밤';

-- ============================================
-- 🌟 3단계: 나머지 음식에 일반 이미지
-- ============================================
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80'
WHERE photo_url IS NULL;

-- ============================================
-- 📊 4단계: 결과 확인
-- ============================================
SELECT 
  COUNT(*) as total,
  COUNT(photo_url) as with_image,
  ROUND(COUNT(photo_url) * 100.0 / COUNT(*), 1) as percentage
FROM meals;

SELECT food_name, COUNT(*) as count, MIN(photo_url) as sample_url
FROM meals
GROUP BY food_name
ORDER BY count DESC
LIMIT 50;
