/* Clear, role-aware navigation for the EduHouse prototype. */
function homeFor(screenId) {
  if (screenId === 'student-login') return 'roles';
  if (screenId.startsWith('student-')) return 'student-account';
  if (screenId.startsWith('provider-')) return 'provider-dash';
  if (screenId.startsWith('uni-')) return 'uni-dash';
  return 'roles';
}

function chooseRole(screenId) {
  navStack = [];
  go(screenId, true);
}

function goHome() {
  const current = document.querySelector('.screen.active');
  navStack = [];
  go(homeFor(current.id), true);
}

function goBack() {
  const current = document.querySelector('.screen.active');
  const previous = navStack.pop();
  if (previous) {
    go(previous, true);
    return;
  }
  const home = homeFor(current.id);
  go(home === current.id ? 'roles' : home, true);
}

document.querySelectorAll('.screen').forEach((screen) => {
  const home = homeFor(screen.id);
  if (screen.id === 'splash' || screen.id === 'roles' || screen.id === home) return;
  const top = screen.querySelector('.top');
  if (!top || top.querySelector('.home')) return;

  const actions = document.createElement('div');
  actions.className = 'nav-actions';
  const back = top.querySelector('.back');
  if (back) actions.append(back);

  const homeButton = document.createElement('button');
  homeButton.className = 'home';
  homeButton.type = 'button';
  homeButton.setAttribute('aria-label', 'Return to home');
  homeButton.title = 'Home';
  homeButton.textContent = '⌂ Home';
  homeButton.onclick = goHome;
  actions.append(homeButton);
  top.prepend(actions);
});

/* A visual, clickable feature tour: each card opens the working feature. */
const featureStyle = document.createElement('style');
featureStyle.textContent = `
  .feature-entry{display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;margin:0 0 15px;padding:13px 14px;border:1px solid #b9e5da;border-radius:16px;background:linear-gradient(105deg,#eaf8f4,#f8fcfb);color:#0B2D4B;font:700 12px Poppins,Arial,sans-serif;cursor:pointer;text-align:left}.feature-entry span{display:block;color:#16A085;font-size:10px;font-weight:600}.feature-entry i{display:grid;place-items:center;width:33px;height:33px;flex:none;border-radius:11px;background:#16A085;color:#fff;font-style:normal;font-size:17px}.feature-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}.feature-card{min-height:174px;padding:12px;border:1px solid #d9e3eb;border-radius:17px;background:#fff;box-shadow:0 5px 15px #0b2d4b0b;text-align:left;cursor:pointer}.feature-card:hover{transform:translateY(-2px);box-shadow:0 9px 20px #0b2d4b18}.feature-card .num{display:grid;place-items:center;width:28px;height:28px;margin-bottom:9px;border-radius:50%;background:#0B2D4B;color:#fff;font-size:11px;font-weight:700}.feature-card.green .num{background:#16A085}.feature-card.yellow .num{background:#F5B301}.feature-card h3{margin:0 0 5px;color:#0B2D4B;font-size:12px;line-height:1.22}.feature-card p{margin:0;color:#64748B;font-size:9px;line-height:1.38}.mini{height:50px;margin-top:10px;border-radius:10px;background:#EAF4FF;position:relative;overflow:hidden}.mini:before,.mini:after{content:'';position:absolute;border-radius:7px}.mini.search:before{left:8px;right:8px;top:9px;height:8px;background:#fff;box-shadow:0 14px 0 #fff,0 28px 0 #fff}.mini.verify:before{left:11px;top:10px;width:26px;height:26px;background:#16A085}.mini.verify:after{left:20px;top:15px;width:8px;height:15px;border:solid #fff;border-width:0 3px 3px 0;transform:rotate(45deg)}.mini.cost:before{left:9px;right:9px;top:8px;height:9px;background:#fff;box-shadow:0 13px 0 #fff,0 26px 0 #d8ebf8}.mini.fit:before{left:9px;top:12px;width:34px;height:8px;background:#16A085;box-shadow:0 14px 0 #F5B301,0 28px 0 #c7dce9}.mini.workspace:before{left:8px;top:9px;width:31px;height:32px;background:#fff;box-shadow:38px 0 0 #fff,76px 0 0 #fff}.mini.support:before{left:15px;top:10px;width:25px;height:25px;border:3px solid #F5B301;background:#fff;border-radius:50%}.mini.support:after{left:20px;top:18px;width:15px;height:3px;background:#F5B301;box-shadow:0 7px 0 #F5B301}.feature-foot{margin:17px 0 0;color:#64748B;font-size:10px;line-height:1.45;text-align:center}
`;
document.head.append(featureStyle);

const featureScreen = document.createElement('section');
featureScreen.id = 'student-feature-overview';
featureScreen.className = 'screen';
featureScreen.innerHTML = `
  <div class="top"><div class="nav-actions"><button class="back" type="button" aria-label="Go back">‹</button><button class="home" type="button" aria-label="Return to home">⌂ Home</button></div><b class="pill">Feature guide</b></div>
  <p class="eyebrow">EduHouse Assurance</p>
  <h1 class="title">From search to informed choice.</h1>
  <p class="lead">Tap a feature to see how it works in this prototype.</p>
  <div class="feature-grid">
    <button class="feature-card" data-go="student-results"><span class="num">01</span><h3>Unified housing search</h3><p>Find participating listings using student-relevant preferences.</p><div class="mini search"></div></button>
    <button class="feature-card green" data-go="student-verify"><span class="num">02</span><h3>Transparent verification</h3><p>See what was checked, when and what remains unknown.</p><div class="mini verify"></div></button>
    <button class="feature-card yellow" data-go="student-compare"><span class="num">03</span><h3>Total-cost comparison</h3><p>Compare rent, utilities, upfront costs and missing information.</p><div class="mini cost"></div></button>
    <button class="feature-card" data-go="student-results"><span class="num">04</span><h3>Student-fit matching</h3><p>Understand fit and trade-offs in commute, cost and living.</p><div class="mini fit"></div></button>
    <button class="feature-card green" data-go="student-workspace"><span class="num">05</span><h3>Housing workspace</h3><p>Keep saved homes, notes, enquiries and viewings together.</p><div class="mini workspace"></div></button>
    <button class="feature-card yellow" data-go="student-support"><span class="num">06</span><h3>University-linked support</h3><p>Access guidance, reporting and support referrals when needed.</p><div class="mini support"></div></button>
  </div>
  <p class="feature-foot">Prototype only. Verification communicates evidence reviewed; it is not a safety, tenancy or availability guarantee.</p>`;
document.querySelector('main.phone').append(featureScreen);
screens.push(featureScreen);
featureScreen.querySelector('.back').onclick = goBack;
featureScreen.querySelector('.home').onclick = goHome;
featureScreen.querySelectorAll('[data-go]').forEach((card) => card.onclick = () => go(card.dataset.go));

const account = document.getElementById('student-account');
const featureEntry = document.createElement('button');
featureEntry.type = 'button';
featureEntry.className = 'feature-entry';
featureEntry.innerHTML = '<span><strong>How EduHouse supports your decision</strong><span>Explore the six features in this prototype</span></span><i>→</i>';
featureEntry.onclick = () => go('student-feature-overview');
account.querySelector('.lead').after(featureEntry);

/* The workspace button opens the review step; this button completes it. */
document.querySelector('#student-enquiry-compose .primary').onclick = () => go('student-success');

/* Step 3: a visual comparison with listing photos and direct detail access. */
const comparisonStyle = document.createElement('style');
comparisonStyle.textContent = `
  .compare-options{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:14px 0 11px}.compare-option{overflow:hidden;border:1px solid #d9e3eb;border-radius:16px;background:#fff;box-shadow:0 4px 13px #0b2d4b0b}.compare-photo{height:91px;background-image:url('student-room-triptych.png');background-size:300% 100%;background-position:left center}.compare-photo.richmond{background-position:center center}.compare-body{padding:10px}.compare-option h3{min-height:31px;margin:0 0 4px;color:#0B2D4B;font-size:11px;line-height:1.28}.compare-option .place{min-height:27px;margin:0;color:#64748B;font-size:9px;line-height:1.32}.compare-option .price{margin:7px 0;color:#0B2D4B;font-size:14px;font-weight:700}.view-details{width:100%;padding:8px;border:1px solid #bfd0dc;border-radius:9px;background:#fff;color:#0B2D4B;font:700 10px Poppins,Arial,sans-serif;cursor:pointer}.choose-home{margin-top:7px;border-color:#F5B301;background:#F5B301}.compare-table .tr{grid-template-columns:1.08fr 1fr 1fr}.compare-table .tr>div{padding:9px 7px;font-size:10px;line-height:1.28}.compare-table .head>div{background:#0B2D4B;color:#fff;font-weight:700}.compare-table .total>div{background:#EAF4FF;color:#0B2D4B;font-weight:700}.compare-table .section-row>div{grid-column:1/-1;background:#eaf8f4;color:#0B2D4B;font-weight:700}.compare-table .check-ok{color:#12745f;font-weight:700}.compare-table .check-caution{color:#926400;font-weight:700}.verification-summary{margin:14px 0;padding:13px;border-radius:14px;background:#eaf8f4;color:#0B2D4B;font-size:11px;line-height:1.5}.verification-summary h3{margin:0 0 8px;font-size:13px}.verification-summary p{margin:5px 0}.verification-summary .check-caution{color:#926400}.verification-summary button{margin-top:10px;padding:8px 11px;border:1px solid #16A085;border-radius:9px;background:#fff;color:#0B2D4B;font:700 11px Poppins,Arial,sans-serif;cursor:pointer}
`;
document.head.append(comparisonStyle);
comparisonStyle.textContent += `.home-specs{margin:6px 0;color:#0B2D4B}.spec-icons{display:inline-flex;align-items:center;gap:13px}.spec-item{display:inline-flex;align-items:center;gap:4px;color:#0B2D4B;font-size:11px;font-weight:700}.spec-item svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}.workspace-card .workspace-copy p.home-specs{color:#0B2D4B}`;
const homeSpecs = {
  glen: { bedrooms: '3 bedrooms · 1 room offered', bathrooms: '1 shared bathroom', bedCount: 3, bathCount: 1 },
  richmond: { bedrooms: '5 bedrooms · 1 room offered', bathrooms: '2 shared bathrooms', bedCount: 5, bathCount: 2 },
  burwood: { bedrooms: 'Studio · 1 sleeping area', bathrooms: '1 private bathroom', bedCount: 1, bathCount: 1 }
};
const bedIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 19V7m18 12V7M3 15h18M5 12V9h14v3M3 19h18"/></svg>';
const bathIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 13h18v2a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5v-2ZM6 13V6a2 2 0 0 1 4 0m-4 1h5M7 20v2m10-2v2"/></svg>';
function specIcons(id) {
  const spec = homeSpecs[id];
  return `<span class="spec-icons" role="group" aria-label="${spec.bedrooms}; ${spec.bathrooms}"><span class="spec-item" title="${spec.bedrooms}">${bedIcon}<b>${spec.bedCount}</b></span><span class="spec-item" title="${spec.bathrooms}">${bathIcon}<b>${spec.bathCount}</b></span></span>`;
}
document.querySelectorAll('#student-results .listing').forEach((card, index) => {
  const id = ['glen', 'richmond', 'burwood'][index];
  const specs = document.createElement('p');
  specs.className = 'home-specs';
  specs.innerHTML = specIcons(id);
  card.querySelector('p.meta').after(specs);
});

const compareScreen = document.getElementById('student-compare');
compareScreen.innerHTML = `
  <div class="top"><div class="nav-actions"><button class="back" type="button" aria-label="Go back">‹</button><button class="home" type="button" aria-label="Return to home">⌂ Home</button></div><b class="pill">Step 3 of 5</b></div>
  <p class="eyebrow">Cost, fit and verification</p>
  <h1 class="title">Compare the full picture.</h1>
  <p class="lead">Compare costs, living fit and verification status before choosing a home.</p>
  <div class="compare-options">
    <article class="compare-option"><div class="compare-photo"></div><div class="compare-body"><h3>Private room near Glenferrie Road</h3><p class="place">Hawthorn, VIC<br>18 min to campus</p><p class="price">$390 <span class="meta">/ week</span></p><button class="view-details" type="button" data-listing="glen">View details</button><button class="view-details choose-home" type="button" data-choose="glen">Choose this home</button></div></article>
    <article class="compare-option"><div class="compare-photo richmond"></div><div class="compare-body"><h3>Furnished room in shared home</h3><p class="place">Richmond, VIC<br>27 min to campus</p><p class="price">$360 <span class="meta">/ week</span></p><button class="view-details" type="button" data-listing="richmond">View details</button><button class="view-details choose-home" type="button" data-choose="richmond">Choose this home</button></div></article>
  </div>
  <div class="table compare-table">
    <div class="tr head"><div>Cost and fit</div><div>Glenferrie</div><div>Richmond</div></div>
    <div class="tr"><div>Rent / week</div><div>$390</div><div>$360</div></div>
    <div class="tr"><div>Utilities</div><div>$25–35 est.</div><div>$30–45 est.</div></div>
    <div class="tr total"><div>Weekly total</div><div>$415–425</div><div>$390–405</div></div>
    <div class="tr"><div>Bond</div><div>$1,560</div><div>$1,440</div></div>
    <div class="tr"><div>Living</div><div>2 housemates</div><div>4 housemates</div></div>
    <div class="tr"><div>Fit</div><div class="good">High</div><div>Medium</div></div>
    <div class="tr section-row"><div>Verification status · see details in each listing</div></div>
    <div class="tr"><div>Provider identity</div><div class="check-ok">✓ Reviewed<br>8 Jan 2027</div><div class="check-ok">✓ Reviewed<br>7 Jan 2027</div></div>
    <div class="tr"><div>Authority to advertise</div><div class="check-ok">✓ Evidence reviewed</div><div class="check-ok">✓ Evidence reviewed</div></div>
    <div class="tr"><div>Listing information</div><div>Rent &amp; availability updated</div><div class="check-caution">Internet cost missing</div></div>
  </div>
  <div class="note"><b>Check before committing:</b> costs are based on provider statements; verification does not guarantee property safety or tenancy approval. Open View details to see the evidence and limitations.</div>`;
compareScreen.querySelector('.back').onclick = goBack;
compareScreen.querySelector('.home').onclick = goHome;
compareScreen.querySelectorAll('[data-listing]').forEach((button) => button.onclick = () => openListing(button.dataset.listing));
compareScreen.querySelectorAll('[data-listing]').forEach((button) => {
  const specs = document.createElement('p');
  specs.className = 'home-specs';
  specs.innerHTML = specIcons(button.dataset.listing);
  button.closest('.compare-body').querySelector('.place').after(specs);
});
const livingComparisonRow = [...compareScreen.querySelectorAll('.compare-table .tr')].find((row) => row.firstElementChild?.textContent === 'Living');
const bedroomComparisonRow = document.createElement('div');
bedroomComparisonRow.className = 'tr';
bedroomComparisonRow.innerHTML = '<div>Bedrooms</div><div>3 · 1 offered</div><div>5 · 1 offered</div>';
const bathroomComparisonRow = document.createElement('div');
bathroomComparisonRow.className = 'tr';
bathroomComparisonRow.innerHTML = '<div>Bathrooms</div><div>1 shared</div><div>2 shared</div>';
livingComparisonRow.after(bedroomComparisonRow, bathroomComparisonRow);
compareScreen.querySelectorAll('[data-choose]').forEach((button) => button.onclick = () => {
  saveHome(button.dataset.choose);
  syncSelectedHome();
  workspaceState.tab = 'saved';
  go('student-workspace');
});

const verificationData = {
  glen: {
    provider: 'Glenferrie Homes', date: '8 January 2027', authority: 'Evidence reviewed for 21 Glenferrie Road.',
    details: 'Rent and availability were updated 2 days ago; room condition was not inspected.', status: 'Provider identity and authority reviewed',
    identityStatus: 'Reviewed 8 January 2027', authorityStatus: 'Evidence reviewed', listingStatus: 'Rent and availability updated; room condition not inspected', authorityChecked: true, detailsChecked: false
  },
  richmond: {
    provider: 'Church Street Share House', date: '7 January 2027', authority: 'Evidence reviewed for 84 Church Street.',
    details: 'Rent and availability were reviewed; internet cost is not stated.', status: 'Provider identity and authority reviewed',
    identityStatus: 'Reviewed 7 January 2027', authorityStatus: 'Evidence reviewed', listingStatus: 'Rent and availability reviewed; internet cost missing', authorityChecked: true, detailsChecked: false
  },
  burwood: {
    provider: 'Station Street Student Living', date: 'date not displayed', authority: 'Evidence of authority to advertise is not shown.',
    details: 'Utilities are provider-stated; listing information was updated 1 day ago.', status: 'Provider identity reviewed; other checks pending',
    identityStatus: 'Reviewed; date not displayed', authorityStatus: 'Not shown', listingStatus: 'Provider-stated; not independently reviewed', authorityChecked: false, detailsChecked: false
  }
};
let selectedVerificationListing = 'glen';
let viewedListingId = 'glen';
let viewedVerificationListing = 'glen';
const listingDetailScreen = document.getElementById('student-listing-detail');
const detailSpecStrip = document.createElement('div');
detailSpecStrip.className = 'home-specs';
listingDetailScreen.querySelector('#detail-rent').after(detailSpecStrip);
const detailAvailabilityRow = listingDetailScreen.querySelector('.table .tr');
const detailBedroomRow = document.createElement('div');
detailBedroomRow.className = 'tr';
detailBedroomRow.innerHTML = '<div>Bedrooms</div><div id="detail-bedrooms" style="grid-column:span 2"></div>';
const detailBathroomRow = document.createElement('div');
detailBathroomRow.className = 'tr';
detailBathroomRow.innerHTML = '<div>Bathrooms</div><div id="detail-bathrooms" style="grid-column:span 2"></div>';
detailAvailabilityRow.after(detailBedroomRow, detailBathroomRow);
comparisonStyle.textContent += `
  .student-fit{margin:14px 0;padding:14px;border:1px solid #c8e7df;border-radius:16px;background:linear-gradient(150deg,#f2fbf8,#fff)}.student-fit h3{margin:0 0 4px;color:#0B2D4B;font-size:14px}.student-fit .fit-context{margin:0 0 12px;color:#64748B;font-size:10px;line-height:1.4}.student-fit .fit-row{display:flex;align-items:flex-start;gap:9px;margin:10px 0}.student-fit .fit-icon{display:grid;place-items:center;flex:none;width:23px;height:23px;border-radius:50%;background:#16A085;color:#fff;font-size:12px;font-weight:700}.student-fit .fit-row.caution .fit-icon{background:#F5B301;color:#0B2D4B}.student-fit .fit-row b{display:block;color:#0B2D4B;font-size:11px;line-height:1.3}.student-fit .fit-row span:last-child{display:block;margin-top:2px;color:#64748B;font-size:10px;line-height:1.4}
`;
const fitData = {
  glen: {
    headline: 'Strong fit for your study routine',
    points: [
      ['ok', 'Within your total budget', 'Estimated $415–425/week against your $450 limit.'],
      ['ok', '18-minute campus commute', 'Within your preferred 30 minutes.'],
      ['ok', 'Living arrangement fits', 'Furnished private room with 2 housemates; you prefer up to 3.'],
      ['caution', 'Check before deciding', 'Utilities are estimated and the bathroom is shared.']
    ]
  },
  richmond: {
    headline: 'Good value with a living trade-off',
    points: [
      ['ok', 'Within your total budget', 'Estimated $390–405/week against your $450 limit.'],
      ['ok', '27-minute campus commute', 'Within your preferred 30 minutes.'],
      ['caution', 'More housemates than preferred', '4 housemates; you prefer up to 3.'],
      ['caution', 'Cost information to confirm', 'Internet cost has not been stated.']
    ]
  },
  burwood: {
    headline: 'Private space with timing trade-offs',
    points: [
      ['ok', 'Within your total budget', '$415/week with utilities included.'],
      ['caution', 'Longer campus commute', 'About 32 minutes; your preference is under 30.'],
      ['caution', 'Different housing type', 'A studio rather than your preferred private room.'],
      ['caution', 'Later move-in', 'Available 20 February; you selected 15 February.']
    ]
  }
};
const detailFit = document.createElement('div');
detailFit.className = 'student-fit';
listingDetailScreen.querySelector('#detail-tag').after(detailFit);
const detailVerification = document.createElement('div');
detailVerification.className = 'verification-summary';
listingDetailScreen.querySelector('.box').after(detailVerification);
const originalOpenListing = openListing;
openListing = function (id) {
  viewedListingId = id;
  originalOpenListing(id);
  detailSpecStrip.innerHTML = specIcons(id);
  listingDetailScreen.querySelector('#detail-bedrooms').textContent = homeSpecs[id].bedrooms;
  listingDetailScreen.querySelector('#detail-bathrooms').textContent = homeSpecs[id].bathrooms;
  const fit = fitData[id];
  detailFit.replaceChildren();
  const fitHeading = document.createElement('h3');
  fitHeading.textContent = '✦ ' + fit.headline;
  const fitContext = document.createElement('p');
  fitContext.className = 'fit-context';
  fitContext.textContent = 'Student-fit matching · based on the preferences shown in your account';
  detailFit.append(fitHeading, fitContext);
  for (const [kind, title, explanation] of fit.points) {
    const row = document.createElement('div');
    row.className = 'fit-row' + (kind === 'caution' ? ' caution' : '');
    const icon = document.createElement('span');
    icon.className = 'fit-icon';
    icon.textContent = kind === 'caution' ? '!' : '✓';
    const copy = document.createElement('div');
    const label = document.createElement('b');
    label.textContent = title;
    const detail = document.createElement('span');
    detail.textContent = explanation;
    copy.append(label, detail);
    row.append(icon, copy);
    detailFit.append(row);
  }
  const review = verificationData[id];
  listingDetailScreen.querySelector('.row .status').textContent = id === 'burwood' ? 'Checks pending' : 'Evidence reviewed';
  detailVerification.innerHTML = `
    <h3>Verification status</h3>
    <p>✓ Provider identity: ${review.identityStatus}</p>
    <p class="${review.authorityChecked ? '' : 'check-caution'}">${review.authorityChecked ? '✓' : '!'} Authority to advertise: ${review.authorityStatus}</p>
    <p class="${review.detailsChecked ? '' : 'check-caution'}">${review.detailsChecked ? '✓' : '!'} Listing information: ${review.listingStatus}</p>
    <button type="button">See checks and limitations</button>`;
  detailVerification.querySelector('button').onclick = () => reviewVerification(id);
};
const verifyScreen = document.getElementById('student-verify');
verifyScreen.innerHTML = `
  <div class="top"><div class="nav-actions"><button class="back" type="button" aria-label="Go back">‹</button><button class="home" type="button" aria-label="Return to home">⌂ Home</button></div><b class="pill">Verification details</b></div>
  <p class="eyebrow">Verification for one listing</p>
  <h1 class="title" id="verify-title"></h1>
  <p class="lead" id="verify-address"></p>
  <div class="box"><span class="status" id="verify-status"></span>
    <div class="check"><i>✓</i><div><b>Provider identity</b><br><span id="verify-provider"></span></div></div>
    <div class="check"><i>✓</i><div><b>Authority to advertise</b><br><span id="verify-authority"></span></div></div>
    <div class="check"><i>✓</i><div><b>Listing information</b><br><span id="verify-details"></span></div></div>
    <div class="check"><i>!</i><div><b>Your checks before committing</b><br>Inspect the home and review the rental agreement independently.</div></div>
  </div>
  <div class="note"><b>What this means:</b> EduHouse reviewed the evidence stated above. Verification does not guarantee property safety, availability or tenancy approval.</div>
  <button class="primary" type="button" id="verify-continue">Save this home to workspace</button>
  <button class="secondary" type="button" id="verify-other">Review the other home's verification</button>`;
verifyScreen.querySelector('.back').onclick = goBack;
verifyScreen.querySelector('.home').onclick = goHome;
verifyScreen.querySelector('#verify-other').onclick = () => reviewVerification(viewedVerificationListing === 'glen' ? 'richmond' : 'glen', true);
verifyScreen.querySelector('#verify-continue').onclick = () => {
  saveHome(viewedVerificationListing);
  syncSelectedHome();
  workspaceState.tab = 'saved';
  go('student-workspace');
};

function syncSelectedHome() {
  const selected = listingData[selectedVerificationListing];
  const compose = document.getElementById('student-enquiry-compose');
  compose.querySelector('.eyebrow').textContent = selected.title;
  compose.querySelector('textarea').value = `Hello, I am interested in ${selected.title.toLowerCase()} at ${selected.address}. I am a Swinburne student looking to move in from 15 February for a 6–12 month lease. Could you confirm availability and arrange a viewing?`;
  document.getElementById('student-response-tracking').querySelector('.eyebrow').textContent = selected.title;
}

function reviewVerification(id, stayOnScreen = false) {
  viewedVerificationListing = id;
  const listing = listingData[id];
  const review = verificationData[id];
  verifyScreen.querySelector('#verify-title').textContent = listing.title;
  verifyScreen.querySelector('#verify-address').textContent = listing.address;
  verifyScreen.querySelector('#verify-status').textContent = '✓ ' + review.status;
  verifyScreen.querySelector('#verify-provider').textContent = review.provider + ' · ' + review.identityStatus.toLowerCase();
  verifyScreen.querySelector('#verify-authority').textContent = review.authority;
  verifyScreen.querySelector('#verify-details').textContent = review.details;
  verifyScreen.querySelectorAll('.check i')[1].textContent = review.authorityChecked ? '✓' : '!';
  verifyScreen.querySelectorAll('.check i')[2].textContent = review.detailsChecked ? '✓' : '!';
  verifyScreen.querySelector('#verify-other').textContent = id === 'glen' ? 'Review Richmond verification' : 'Review Glenferrie verification';
  if (!stayOnScreen) go('student-verify');
}

featureScreen.querySelector('[data-go="student-verify"]').onclick = () => go('student-compare');
featureScreen.querySelectorAll('[data-go="student-results"]')[1].onclick = () => openListing('glen');
comparisonStyle.textContent += `
  .match-method{margin:9px 0 13px;padding:9px 11px;border:1px solid #cfe5df;border-radius:11px;background:#f6fcfa;color:#0B2D4B}.match-method summary{cursor:pointer;font-size:11px;font-weight:700}.match-method p{margin:8px 0 0;color:#526779;font-size:10px;line-height:1.45}.listing.best-match{border:2px solid #16A085;background:#f6fcfa;box-shadow:0 5px 15px #16a08518}.match-label{display:inline-block;margin:0 0 6px;padding:4px 8px;border-radius:12px;background:#EAF4FF;color:#0B2D4B;font-size:10px;font-weight:700}.match-label.best{background:#16A085;color:#fff}.match-label.caution{background:#fff1cc;color:#785500}.match-reasons{margin:7px 0}.match-reasons span{display:block;margin:3px 0;color:#12745f;font-size:10px;line-height:1.35}.match-reasons .tradeoff{color:#8a650d}.listing .match-more{display:block;margin-top:4px;color:#0B2D4B;font-size:9px;font-weight:700}
`;
const resultScreen = document.getElementById('student-results');
const matchMethod = document.createElement('details');
matchMethod.className = 'match-method';
matchMethod.innerHTML = '<summary>How suggestions work</summary><p>These participating homes are ordered using the sample profile: total budget up to $450/week, commute under 30 minutes, a private room, up to 3 housemates and move-in by 15 February. Short commute is the top priority. Costs and availability should be confirmed with providers.</p>';
resultScreen.querySelector('.search').after(matchMethod);
resultScreen.querySelector('.note').remove();
const resultMatchData = [
  { label: 'Best match for you', kind: 'best', summary: 'Fits your stated needs and has the shortest commute.', reasons: ['✓ Estimated total within your $450 limit', '✓ 18-minute commute · 2 housemates'], tradeoff: 'Check: utilities are estimated.' },
  { label: 'Lower estimated cost', kind: '', summary: 'Fits your budget and commute, with a living trade-off.', reasons: ['✓ Estimated total $390–405/week', '✓ 27-minute commute'], tradeoff: 'Trade-off: 4 housemates; you prefer up to 3.' },
  { label: 'More private, less aligned', kind: 'caution', summary: 'A private studio with included utilities.', reasons: ['✓ Utilities included in the $415 rent'], tradeoff: 'Trade-offs: 32-minute commute and later move-in.' }
];
resultScreen.querySelectorAll('.listing').forEach((card, index) => {
  const match = resultMatchData[index];
  if (index === 0) card.classList.add('best-match');
  const heading = card.querySelector('h3');
  const label = document.createElement('span');
  label.className = 'match-label ' + match.kind;
  label.textContent = match.label;
  heading.before(label);
  card.querySelectorAll('p.meta')[1].textContent = match.summary;
  const reasons = document.createElement('div');
  reasons.className = 'match-reasons';
  match.reasons.forEach((reason) => {
    const line = document.createElement('span');
    line.textContent = reason;
    reasons.append(line);
  });
  const caution = document.createElement('span');
  caution.className = 'tradeoff';
  caution.textContent = match.tradeoff;
  reasons.append(caution);
  const more = document.createElement('span');
  more.className = 'match-more';
  more.textContent = 'Tap to see full fit details →';
  reasons.append(more);
  card.querySelector('.rent').before(reasons);
});
document.querySelector('#student-results .eyebrow').textContent = 'Step 2 of 4';
compareScreen.querySelector('.pill').textContent = 'Step 3 of 4';
document.querySelector('#student-workspace .pill').textContent = 'Step 4 of 4';

/* Step 4: a visual workspace that reflects the student's demo actions. */
comparisonStyle.textContent += `
  .workspace-tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin:13px 0 17px}.workspace-tab{min-height:73px;padding:8px 5px;border:1px solid #d9e3eb;border-radius:13px;background:#f8fafc;color:#0B2D4B;text-align:center;cursor:pointer}.workspace-tab.active{border-color:#16A085;background:#eaf8f4;box-shadow:inset 0 0 0 1px #16A085}.workspace-tab .tab-icon{display:block;font-size:17px;line-height:1.1}.workspace-tab b{display:block;margin:3px 0 1px;font-size:13px}.workspace-tab small{display:block;color:#64748B;font-size:9px}.workspace-card{overflow:hidden;margin:10px 0;border:1px solid #d9e3eb;border-radius:16px;background:#fff;box-shadow:0 5px 14px #0b2d4b0c}.workspace-card .workspace-photo{height:122px;background-image:url('student-room-triptych.png');background-size:300% 100%;background-position:left center}.workspace-card .workspace-photo.two{background-position:center center}.workspace-card .workspace-photo.three{background-position:right center}.workspace-card .workspace-photo.external{display:grid;place-items:center;background:#EAF4FF;color:#0B2D4B;font-size:14px;font-weight:700}.workspace-card .workspace-copy{padding:12px}.workspace-card .workspace-copy h3{margin:0 0 3px;color:#0B2D4B;font-size:14px;line-height:1.3}.workspace-card .workspace-copy p{margin:4px 0;color:#64748B;font-size:10px;line-height:1.4}.workspace-badge{display:inline-block;margin:3px 0 6px;padding:4px 8px;border-radius:12px;background:#eaf8f4;color:#12745f;font-size:10px;font-weight:700}.workspace-badge.pending{background:#fff6de;color:#8b6100}.workspace-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}.workspace-actions button{min-height:36px;padding:7px;border:1px solid #bfd0dc;border-radius:9px;background:#fff;color:#0B2D4B;font:700 10px Poppins,Arial,sans-serif;cursor:pointer}.workspace-actions button.action{border-color:#F5B301;background:#F5B301}.workspace-empty{margin:10px 0 18px;padding:25px 17px;border:1px dashed #b9cbd8;border-radius:16px;background:#f8fafc;text-align:center}.workspace-empty strong{display:block;color:#0B2D4B;font-size:13px}.workspace-empty p{color:#64748B;font-size:11px;line-height:1.45}
`;
const workspaceScreen = document.getElementById('student-workspace');
const workspaceStorageKey = 'eduhouse-student-workspace-demo-v1';
function readWorkspaceState() {
  try {
    const saved = JSON.parse(localStorage.getItem(workspaceStorageKey) || 'null');
    if (saved && Array.isArray(saved.savedHomes)) {
      return {
        tab: 'saved',
        savedHomes: saved.savedHomes.filter((id) => id in listingData),
        externalSaved: Boolean(saved.externalSaved),
        enquiryFor: saved.enquiryFor in listingData ? saved.enquiryFor : null,
        viewingFor: saved.viewingFor in listingData ? saved.viewingFor : null
      };
    }
  } catch (_) { /* File-based previews may not provide local storage. */ }
  return { tab: 'saved', savedHomes: [], externalSaved: false, enquiryFor: null, viewingFor: null };
}
const workspaceState = readWorkspaceState();
if (workspaceState.savedHomes.length) selectedVerificationListing = workspaceState.savedHomes.at(-1);
function persistWorkspaceState() {
  try {
    localStorage.setItem(workspaceStorageKey, JSON.stringify(workspaceState));
  } catch (_) { /* The demo still works within the current session. */ }
}
function saveHome(id) {
  if (!workspaceState.savedHomes.includes(id)) workspaceState.savedHomes.push(id);
  selectedVerificationListing = id;
  persistWorkspaceState();
}
const originalGo = go;
go = function (id, fromBack = false) {
  if (id === 'student-workspace') renderWorkspace();
  originalGo(id, fromBack);
};

function homeCard(id, badge, badgeClass = '', actions = []) {
  const home = listingData[id];
  const buttons = actions.map(([label, action, prominent]) => `<button type="button" data-action="${action}" data-home="${id}" class="${prominent ? 'action' : ''}">${label}</button>`).join('');
  return `<article class="workspace-card">
    <div class="workspace-photo ${home.photo}"></div>
    <div class="workspace-copy"><h3>${home.title}</h3><p>${home.address}</p><p class="home-specs">${specIcons(id)}</p><p><b>${home.rent}</b></p>
      <span class="workspace-badge ${badgeClass}">${badge}</span>
      <div class="workspace-actions">${buttons}</div>
    </div></article>`;
}

function renderWorkspace() {
  const selected = selectedVerificationListing;
  const savedCount = workspaceState.savedHomes.length + Number(workspaceState.externalSaved);
  const accountSavedStat = document.querySelector('#student-account .stats div:first-child');
  accountSavedStat.querySelector('b').textContent = String(savedCount);
  accountSavedStat.querySelector('span').textContent = savedCount === 1 ? 'saved home' : 'saved homes';
  const accountSavedCard = document.querySelectorAll('#student-account .box')[1];
  accountSavedCard.querySelector('h3').textContent = workspaceState.savedHomes.length ? listingData[workspaceState.savedHomes.at(-1)].title : workspaceState.externalSaved ? 'External link saved' : 'No homes saved yet';
  accountSavedCard.querySelector('p').textContent = workspaceState.savedHomes.length ? 'Your shortlisted homes are ready in the workspace.' : workspaceState.externalSaved ? 'The external link is labelled unverified in your workspace.' : 'Save a listing to keep it in your account.';
  const accountEnquiryStat = document.querySelector('#student-account .stats div:nth-child(2)');
  accountEnquiryStat.querySelector('b').textContent = workspaceState.enquiryFor ? '1' : '0';
  accountEnquiryStat.querySelector('span').textContent = workspaceState.enquiryFor ? 'enquiry sent' : 'enquiries sent';
  let content = '';
  if (workspaceState.tab === 'saved') {
    content = workspaceState.savedHomes.length
      ? [...workspaceState.savedHomes].sort((a, b) => Number(b === selected) - Number(a === selected)).map((id) =>
        id === selected
          ? homeCard(id, workspaceState.enquiryFor === id ? 'Enquiry sent' : 'Selected for enquiry', '', [['View details', 'details'], [workspaceState.enquiryFor === id ? 'View enquiry status' : 'Send enquiry', workspaceState.enquiryFor === id ? 'status' : 'enquire', true]])
          : homeCard(id, workspaceState.enquiryFor === id ? 'Enquiry sent' : 'Saved for comparison', '', [['View details', 'details'], ['Choose this home', 'choose', true]])
      ).join('')
      : `<div class="workspace-empty"><strong>No participating homes saved yet</strong><p>Open a listing and tap “Save to workspace”, or choose a home after comparing options.</p></div>`;
    if (workspaceState.externalSaved) content += `<article class="workspace-card"><div class="workspace-photo external">External listing</div><div class="workspace-copy"><h3>Hawthorn room · external link</h3><p>Saved from another website. Provider, property details and images have not been reviewed by EduHouse.</p><span class="workspace-badge pending">Unverified</span></div></article>`;
    content += `<button class="secondary" type="button" id="workspace-external">${workspaceState.externalSaved ? 'External example saved' : 'Save an external link · demo'}</button>`;
  } else if (workspaceState.tab === 'contacted') {
    content = workspaceState.enquiryFor
      ? homeCard(workspaceState.enquiryFor, 'Enquiry sent · response available in demo', '', [['View details', 'details'], ['View enquiry status', 'status', true]])
      : `<div class="workspace-empty"><strong>No enquiries sent yet</strong><p>Open a saved home and send an enquiry when you are ready.</p></div>`;
  } else {
    content = workspaceState.viewingFor
      ? homeCard(workspaceState.viewingFor, 'Viewing requested · awaiting provider confirmation', 'pending', [['View details', 'details'], ['View enquiry status', 'status', true]])
      : `<div class="workspace-empty"><strong>No viewing requests yet</strong><p>After contacting a provider, you can request a viewing time.</p></div>`;
  }
  workspaceScreen.innerHTML = `
    <div class="top"><div class="nav-actions"><button class="back" type="button" aria-label="Go back">‹</button><button class="home" type="button" aria-label="Return to home">⌂ Home</button></div><b class="pill">Step 4 of 4</b></div>
    <h1 class="title">Your housing workspace</h1>
    <p class="lead">See the homes you saved, contacted and requested to view.</p>
    <div class="workspace-tabs">
      <button class="workspace-tab ${workspaceState.tab === 'saved' ? 'active' : ''}" data-tab="saved"><span class="tab-icon">♡</span><b>${savedCount}</b><small>Saved</small></button>
      <button class="workspace-tab ${workspaceState.tab === 'contacted' ? 'active' : ''}" data-tab="contacted"><span class="tab-icon">✉</span><b>${workspaceState.enquiryFor ? 1 : 0}</b><small>Contacted</small></button>
      <button class="workspace-tab ${workspaceState.tab === 'viewings' ? 'active' : ''}" data-tab="viewings"><span class="tab-icon">▣</span><b>${workspaceState.viewingFor ? 1 : 0}</b><small>Viewing</small></button>
    </div>
    <div id="workspace-content">${content}</div>
    <div class="panel"><h3>Need housing guidance?</h3><p>Swinburne support can help with rental questions, housing stress and referrals.</p><button class="link" type="button" id="workspace-support">Get Swinburne support</button></div>
    <button class="secondary" type="button" id="workspace-search">Continue searching</button>`;
  workspaceScreen.querySelector('.back').onclick = goBack;
  workspaceScreen.querySelector('.home').onclick = goHome;
  workspaceScreen.querySelectorAll('[data-tab]').forEach((button) => button.onclick = () => { workspaceState.tab = button.dataset.tab; renderWorkspace(); });
  workspaceScreen.querySelectorAll('[data-action]').forEach((button) => button.onclick = () => {
    const id = button.dataset.home;
    if (button.dataset.action === 'details') openListing(id);
    if (button.dataset.action === 'choose') { saveHome(id); syncSelectedHome(); renderWorkspace(); }
    if (button.dataset.action === 'enquire') { saveHome(id); syncSelectedHome(); go('student-enquiry-compose'); }
    if (button.dataset.action === 'status') go('student-response-tracking');
  });
  workspaceScreen.querySelector('#workspace-support').onclick = () => go('student-support');
  workspaceScreen.querySelector('#workspace-search').onclick = () => go('student-results');
  const externalButton = workspaceScreen.querySelector('#workspace-external');
  if (externalButton) {
    externalButton.disabled = workspaceState.externalSaved;
    externalButton.onclick = () => { workspaceState.externalSaved = true; persistWorkspaceState(); renderWorkspace(); };
  }
}

document.querySelector('#student-enquiry-compose .primary').onclick = () => {
  saveHome(selectedVerificationListing);
  workspaceState.enquiryFor = selectedVerificationListing;
  workspaceState.tab = 'contacted';
  persistWorkspaceState();
  go('student-success');
};
document.querySelector('#student-viewing-request .primary').onclick = () => {
  workspaceState.viewingFor = workspaceState.enquiryFor || selectedVerificationListing;
  workspaceState.tab = 'viewings';
  persistWorkspaceState();
  go('student-viewing-confirmed');
};
const viewingResult = document.getElementById('student-viewing-confirmed');
viewingResult.querySelector('.eyebrow').textContent = 'Viewing request sent';
viewingResult.querySelector('.title').textContent = 'Waiting for provider confirmation.';
viewingResult.querySelector('.lead').textContent = 'Your preferred time was sent to the provider. The viewing is not booked until they confirm it.';
document.querySelector('#student-listing-detail .secondary').onclick = () => {
  saveHome(viewedListingId);
  syncSelectedHome();
  workspaceState.tab = 'saved';
  go('student-workspace');
};
renderWorkspace();

/* Feature 6: three clear support routes adapted from the report visual. */
comparisonStyle.textContent += `
  .support-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:17px 0}.support-card{display:flex;flex-direction:column;align-items:flex-start;min-height:185px;padding:12px 9px;border:0;border-radius:15px;text-align:left;cursor:pointer;color:#0B2D4B}.support-card.guidance{background:#eaf8f4}.support-card.report{background:#eaf4ff}.support-card.university{background:#fff6de}.support-card:hover{transform:translateY(-2px);box-shadow:0 7px 16px #0b2d4b15}.support-icon{display:grid;place-items:center;width:39px;height:39px;margin-bottom:10px;border:2px solid currentColor;border-radius:11px;font-size:21px;line-height:1}.support-card.guidance .support-icon{color:#16A085}.support-card.report .support-icon{color:#0B2D4B}.support-card.university .support-icon{color:#d89900}.support-card strong{font-size:11px;line-height:1.25}.support-card .support-desc{display:block;margin:6px 0 10px;color:#546a7d;font-size:9px;line-height:1.35}.support-card .support-arrow{margin-top:auto;color:#0B2D4B;font-size:18px}.support-section{margin:17px 0;padding:15px;border:1px solid #d9e3eb;border-radius:15px;background:#fff}.support-section h3{margin:0 0 7px;color:#0B2D4B;font-size:14px}.support-section p,.support-section li{color:#546a7d;font-size:11px;line-height:1.55}.support-section ul{padding-left:18px;margin:7px 0 0}@media(max-width:380px){.support-grid{grid-template-columns:1fr}.support-card{min-height:0}.support-card .support-desc{font-size:10px}}
`;
const supportScreen = document.getElementById('student-support');
supportScreen.innerHTML = `
  <div class="top"><div class="nav-actions"><button class="back" type="button" aria-label="Go back">‹</button><button class="home" type="button" aria-label="Return to home">⌂ Home</button></div><b class="pill">University-linked support</b></div>
  <p class="eyebrow">Practical help for your housing journey</p>
  <h1 class="title">Support and guidance</h1>
  <p class="lead">Choose the kind of help you need while searching or preparing to rent.</p>
  <div class="support-grid">
    <button class="support-card guidance" type="button" data-support="guidance"><span class="support-icon">▤</span><strong>Rental guidance</strong><span class="support-desc">Checklists and scam warnings for renting in Australia.</span><span class="support-arrow">→</span></button>
    <button class="support-card report" type="button" data-support="report"><span class="support-icon">⚑</span><strong>Report a listing</strong><span class="support-desc">Tell EduHouse about inaccurate or suspicious information.</span><span class="support-arrow">→</span></button>
    <button class="support-card university" type="button" data-support="university"><span class="support-icon">☏</span><strong>Contact university support</strong><span class="support-desc">Find Swinburne housing and student support pathways.</span><span class="support-arrow">→</span></button>
  </div>
  <div class="panel"><h3>Swinburne University Support</h3><p>University teams provide support and referrals. EduHouse does not approve tenancies or endorse a listed home.</p></div>
  <button class="secondary" type="button" id="support-workspace">Return to my workspace</button>`;
supportScreen.querySelector('.back').onclick = goBack;
supportScreen.querySelector('.home').onclick = goHome;
supportScreen.querySelector('[data-support="guidance"]').onclick = () => go('student-rental-guidance');
supportScreen.querySelector('[data-support="report"]').onclick = () => go('student-report-listing');
supportScreen.querySelector('[data-support="university"]').onclick = () => go('student-university-support');
supportScreen.querySelector('#support-workspace').onclick = () => go('student-workspace');
const accountSupportPanel = account.querySelector('.panel');
accountSupportPanel.querySelector('h3').textContent = 'Support & guidance · Feature 6';
accountSupportPanel.querySelector('p').textContent = 'Rental guidance, listing reports and Swinburne support in one place.';
const accountSupportButton = accountSupportPanel.querySelector('button');
accountSupportButton.textContent = 'Open Support & guidance →';
accountSupportButton.onclick = () => go('student-support');
const reportResult = document.getElementById('student-report-success');
reportResult.querySelector('.eyebrow').textContent = 'Demo report submitted';
reportResult.querySelector('.title').textContent = 'You have completed the reporting flow.';
reportResult.querySelector('.lead').textContent = 'In a live EduHouse service, the team would review the concern and may check, update, flag or remove the listing. This demo does not send a real report.';

const guidanceScreen = document.createElement('section');
guidanceScreen.id = 'student-rental-guidance';
guidanceScreen.className = 'screen';
guidanceScreen.innerHTML = `
  <div class="top"><div class="nav-actions"><button class="back" type="button" aria-label="Go back">‹</button><button class="home" type="button" aria-label="Return to home">⌂ Home</button></div><b class="pill">Rental guidance</b></div>
  <h1 class="title">Check before you commit.</h1>
  <p class="lead">Use these prompts when assessing a home or speaking with a provider.</p>
  <div class="support-section"><h3>Before an enquiry or viewing</h3><ul><li>Check the provider and listing information shown in EduHouse.</li><li>Ask what the rent includes and which charges are estimates.</li><li>Confirm the move-in date, lease length and living arrangements.</li></ul></div>
  <div class="support-section"><h3>Before signing or paying</h3><ul><li>Inspect the property where possible.</li><li>Read the rental agreement and confirm rent, bond and utilities.</li><li>Keep written records of messages and payments.</li></ul></div>
  <div class="support-section"><h3>Scam warning signs</h3><p>Be cautious if someone pressures you to pay immediately, refuses an inspection or asks you to use an unusual payment method. Report suspicious listings to EduHouse.</p><button class="link" type="button" id="guidance-report">Report a listing</button></div>
  <button class="secondary" type="button" id="guidance-university">Find university support</button>`;
document.querySelector('main.phone').append(guidanceScreen);
screens.push(guidanceScreen);
guidanceScreen.querySelector('.back').onclick = goBack;
guidanceScreen.querySelector('.home').onclick = goHome;
guidanceScreen.querySelector('#guidance-report').onclick = () => go('student-report-listing');
guidanceScreen.querySelector('#guidance-university').onclick = () => go('student-university-support');
const referralRoutes = [
  ['Accommodation Support', 'Guidance on student accommodation options and housing resources.'],
  ['Student Wellbeing', 'Support when housing stress affects your wellbeing or studies.'],
  ['International Student Support', 'Guidance for students new to Australia and its rental process.'],
  ['Tenancy or Legal Referral', 'Help finding an appropriate tenancy, consumer or legal service.']
];
const referralScreen = document.createElement('section');
referralScreen.id = 'student-support-referral';
referralScreen.className = 'screen';
referralScreen.innerHTML = `
  <div class="top"><div class="nav-actions"><button class="back" type="button" aria-label="Go back">‹</button><button class="home" type="button" aria-label="Return to home">⌂ Home</button></div><b class="pill">Swinburne support</b></div>
  <p class="eyebrow">University referral pathway</p><h1 class="title" id="referral-title"></h1>
  <div class="support-section"><h3>How this team can help</h3><p id="referral-description"></p></div>
  <div class="note"><b>Prototype:</b> This page illustrates the referral route. No request is sent to Swinburne from this demo.</div>
  <button class="primary" type="button" id="referral-back">See all support options</button>`;
document.querySelector('main.phone').append(referralScreen);
screens.push(referralScreen);
referralScreen.querySelector('.back').onclick = goBack;
referralScreen.querySelector('.home').onclick = goHome;
referralScreen.querySelector('#referral-back').onclick = () => go('student-university-support');
document.querySelectorAll('#student-university-support .smallbtn').forEach((button, index) => {
  button.onclick = () => {
    referralScreen.querySelector('#referral-title').textContent = referralRoutes[index][0];
    referralScreen.querySelector('#referral-description').textContent = referralRoutes[index][1];
    go('student-support-referral');
  };
});
reviewVerification('glen', true);
