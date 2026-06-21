const friends = [
  { name: 'もちたろう', role: 'ひまわり部長', status: '新しい回し車を組み立て中', color: '#f8c66d', online: true },
  { name: 'きなこ', role: '砂浴びマスター', status: '今日の砂はふかふかだよ', color: '#e7a76a', online: true },
  { name: 'ごま', role: '夜更かし担当', status: '23時から本気出す', color: '#9b8c7d', online: false },
  { name: 'ぽんず', role: 'おやつ係', status: '乾燥りんごを発見！', color: '#f2d398', online: true },
];

const messages = [
  { id: 1, from: 'friend', text: 'おはむ〜！今日もふわふわな一日にしよう🐹', time: '09:18' },
  { id: 2, from: 'me', text: 'おはよう！ひまわりの種ミーティング何時？', time: '09:19' },
  { id: 3, from: 'friend', text: '10時だよ。議題は「ほっぺ袋の収納術」です。', time: '09:20' },
  { id: 4, from: 'friend', text: 'あと、新作スタンプもできた！', time: '09:21', sticker: '🌻🐹' },
  { id: 5, from: 'me', text: '最高！あとで巣材カフェ集合ね。', time: '09:22' },
];

let activeFriend = friends[0];

const friendList = document.querySelector('#friendList');
const messagesElement = document.querySelector('#messages');
const composer = document.querySelector('#composer');
const messageInput = document.querySelector('#messageInput');
const seedCount = document.querySelector('#seedCount');
const seedMeter = document.querySelector('#seedMeter');

function hamsterFace(className = 'avatar', friend = activeFriend) {
  return `<div class="${className}" style="--fur:${friend.color}" aria-label="${friend.name}のアバター">
    <span class="ear left"></span><span class="ear right"></span>
    <span class="eye left"></span><span class="eye right"></span>
    <span class="nose"></span><span class="cheek left"></span><span class="cheek right"></span>
  </div>`;
}

function renderFriends() {
  friendList.innerHTML = friends.map((friend) => `
    <button class="friend-card ${friend.name === activeFriend.name ? 'active' : ''}" data-name="${friend.name}">
      ${hamsterFace('avatar', friend)}
      <span class="friend-copy"><strong>${friend.name}</strong><small>${friend.status}</small></span>
      <span class="presence ${friend.online ? 'online' : ''}"></span>
    </button>
  `).join('');
}

function renderHeader() {
  document.querySelector('#headerAvatar').outerHTML = hamsterFace('avatar large', activeFriend);
  document.querySelector('#friendRole').textContent = activeFriend.role;
  document.querySelector('#friendName').textContent = activeFriend.name;
  document.querySelector('#friendPresence').textContent = activeFriend.online ? 'オンライン・回し車中' : 'おやすみ中';
  document.querySelector('.chat-panel').setAttribute('aria-label', `${activeFriend.name}とのチャット`);
}

function renderMessages() {
  const timeline = messages.map((message) => `
    <article class="message-row ${message.from}">
      ${message.from === 'friend' ? hamsterFace('avatar small', activeFriend) : ''}
      <div class="bubble-wrap">
        ${message.sticker ? `<div class="sticker">${message.sticker}</div>` : ''}
        <p class="bubble">${message.text}</p>
        <small>${message.time}</small>
      </div>
    </article>
  `).join('');
  messagesElement.innerHTML = `<time>今日</time>${timeline}`;
  messagesElement.scrollTop = messagesElement.scrollHeight;
  const count = messages.filter((message) => message.from === 'me').length * 3 + 12;
  seedCount.textContent = count;
  seedMeter.style.width = `${Math.min(count * 3, 100)}%`;
}

friendList.addEventListener('click', (event) => {
  const card = event.target.closest('.friend-card');
  if (!card) return;
  activeFriend = friends.find((friend) => friend.name === card.dataset.name) || friends[0];
  renderFriends();
  renderHeader();
  renderMessages();
});

composer.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = messageInput.value.trim();
  if (!text) return;
  messages.push({
    id: Date.now(),
    from: 'me',
    text,
    time: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
  });
  messageInput.value = '';
  renderMessages();
});

renderFriends();
renderHeader();
renderMessages();
