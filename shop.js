const WHATSAPP = '5564992953761';
const INSTAGRAM = 'https://www.instagram.com/loja.rz.maquiagens';

// Catálogo inicial conferido nas publicações da loja em 25/09/2026.
// Preços, variantes e estoque não aparecem de forma confiável no perfil.
const products = [
  {id:'hidratante-rz',name:'Hidratante Facial Diurno FPS 30',brand:'Renata Zapata Beauty',category:'Skincare',image:'hidratante-rz.webp',description:'Hidratação para incluir no cuidado diário da pele.',source:`${INSTAGRAM}/p/DDHVEHzuZhB/`,tag:'Linha RZ'},
  {id:'blindagem-rz',name:'Blindagem Magic Shield',brand:'Renata Zapata Beauty',category:'Fixação',image:'blindagem-rz.webp',description:'Produto da linha RZ para preparar a maquiagem.',source:`${INSTAGRAM}/p/DDHVw7Luwgy/`,tag:'Linha RZ'},
  {id:'bruma-rz',name:'Bruma Fixadora',brand:'Renata Zapata Beauty',category:'Fixação',image:'bruma-rz.webp',description:'Bruma apresentada pela RZ Maquiagens.',source:`${INSTAGRAM}/p/DDHWURFO_Cc/`,tag:'Linha RZ'},
  {id:'paleta-bridgerton',name:'Paleta BT x Bridgerton',brand:'Bruna Tavares',category:'Olhos',image:'paleta-bridgerton.webp',description:'Seis tons com acabamentos matte, perolados e cintilantes.',source:`${INSTAGRAM}/reel/DdJXglptGwk/`,tag:'Destaque'},
  {id:'mascara-klasme',name:'Máscara de Cílios Klasme',brand:'Klasme',category:'Olhos',image:'mascara-klasme.webp',description:'Para cílios definidos e um olhar marcante.',source:`${INSTAGRAM}/reel/DdkEvgpxkoS/`,tag:'No Instagram'},
  {id:'gloss-make-more',name:'Lip Gloss Make More',brand:'Make More',category:'Lábios',image:'gloss-make-more.webp',description:'Brilho e conforto para usar sozinho ou sobre o batom.',source:`${INSTAGRAM}/reel/Ddj7d74RSJu/`,tag:'No Instagram'},
  {id:'soap-brow',name:'Soap Brow Dailus',brand:'Dailus',category:'Sobrancelhas',image:'soap-brow-dailus.webp',description:'Para alinhar e definir as sobrancelhas.',source:`${INSTAGRAM}/reel/Ddb-LiERuwT/`,tag:'No Instagram'},
  {id:'bauny-sono',name:'Creme Facial Sono da Beleza',brand:'Bauny',category:'Skincare',image:'bauny-sono.webp',description:'Creme facial com niacinamida e D-pantenol.',source:`${INSTAGRAM}/p/DdR0h6gBb3U/`,tag:'Skincare'},
  {id:'bauny-tonico',name:'Tônico Facial Ácido Hialurônico e Camomila',brand:'Bauny',category:'Skincare',image:'tonico-bauny.webp',description:'Tônico facial apresentado pela loja.',source:`${INSTAGRAM}/p/DdR0ZaIBhyl/`,tag:'Skincare'},
  {id:'bauny-melancia',name:'Creme Facial Niacinamida + Melancia',brand:'Bauny',category:'Skincare',image:'bauny-melancia.webp',description:'Hidratante facial apresentado pela loja.',source:`${INSTAGRAM}/p/DdR0OuxRfbO/`,tag:'Skincare'}
];

const categories = [
  {name:'Skincare',image:'hidratante-rz.webp'},
  {name:'Lábios',image:'gloss-make-more.webp'},
  {name:'Olhos',image:'paleta-bridgerton.webp'},
  {name:'Sobrancelhas',image:'soap-brow-dailus.webp'},
  {name:'Fixação',image:'bruma-rz.webp'},
  {name:'Todos',image:'modelo-maquiagem.webp'}
];
const $ = selector => document.querySelector(selector);
const safe = value => String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const byId = id => products.find(product=>product.id===id);
const productForItem = item => byId(item.id) || (item.id.startsWith('custom-') && item.name ? {name:item.name,brand:'Produto solicitado',image:'modelo-maquiagem.webp'} : null);
let cart;
try { cart = JSON.parse(localStorage.getItem('rz-cart')) || []; } catch { cart = []; }
cart = Array.isArray(cart) ? cart.filter(item=>typeof item.id==='string' && productForItem(item) && Number.isInteger(item.qty) && item.qty>0).map(item=>({id:item.id,name:item.name?String(item.name).slice(0,180):undefined,qty:Math.min(item.qty,99),variant:String(item.variant||'').slice(0,70)})) : [];
const persist = () => { localStorage.setItem('rz-cart',JSON.stringify(cart)); renderCart(); };

function renderCategories(){
  $('#category-grid').innerHTML=categories.map(category=>`<button class="category-card" data-category="${category.name}"><span class="category-image"><img src="/assets/${category.image}" alt="" loading="lazy"></span><strong>${category.name}</strong></button>`).join('');
  $('#category-filter').insertAdjacentHTML('beforeend',categories.filter(c=>c.name!=='Todos').map(c=>`<option value="${c.name}">${c.name}</option>`).join(''));
}
function renderProducts(){
  const query=$('#site-search').value.trim().toLocaleLowerCase('pt-BR');
  const category=$('#category-filter').value;
  let visible=products.filter(product=>(category==='todos'||product.category===category) && (!query || `${product.name} ${product.brand} ${product.category}`.toLocaleLowerCase('pt-BR').includes(query)));
  if($('#sort-products').value==='name') visible=[...visible].sort((a,b)=>a.name.localeCompare(b.name,'pt-BR'));
  $('#empty-results').hidden=visible.length>0;
  $('#product-grid').innerHTML=visible.map(product=>`<article class="product-card"><div class="product-media"><img src="/assets/${product.image}" alt="${safe(product.name)}" loading="lazy"><span class="product-tag">${product.tag}</span><button class="quick-add" data-add="${product.id}" aria-label="Adicionar ${safe(product.name)} à sacolinha">+</button></div><div class="product-info"><small>${safe(product.brand)} · ${safe(product.category)}</small><h3>${safe(product.name)}</h3><p>${safe(product.description)}</p><div class="product-bottom"><span>Valor sob consulta</span><button data-add="${product.id}">Adicionar à sacola ↗</button></div><a class="source-link" href="${product.source}" target="_blank" rel="noopener noreferrer">Ver publicação ↗</a></div></article>`).join('');
}
function openCart(){ $('#bag-drawer').classList.add('open'); $('#bag-drawer').setAttribute('aria-hidden','false'); $('#drawer-overlay').hidden=false; document.body.style.overflow='hidden'; $('#bag-close').focus(); }
function closeCart(){ $('#bag-drawer').classList.remove('open'); $('#bag-drawer').setAttribute('aria-hidden','true'); $('#drawer-overlay').hidden=true; document.body.style.overflow=''; $('#bag-toggle').focus(); }
function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),2400);}
function addProduct(id){const found=cart.find(item=>item.id===id);if(found)found.qty=Math.min(99,found.qty+1);else cart.push({id,qty:1,variant:''});persist();toast('Adicionado à sua sacolinha');}
function addCustomProduct(name){const cleaned=name.trim().slice(0,180);if(!cleaned)return;cart.push({id:`custom-${Date.now()}`,name:cleaned,qty:1,variant:''});persist();toast('Produto solicitado adicionado à sacolinha');$('#custom-product').value='';}
function renderCart(){
  const count=cart.reduce((sum,item)=>sum+item.qty,0);
  $('#bag-count').textContent=count;$('#drawer-count').textContent=`(${count})`;
  $('#checkout').disabled=!cart.length;
  $('#bag-items').innerHTML=cart.length?cart.map(item=>{const product=productForItem(item);return `<div class="bag-item"><img src="/assets/${product.image}" alt=""><div><h3>${safe(product.name)}</h3><small>${safe(product.brand)}</small><input class="variant" data-variant="${item.id}" value="${safe(item.variant)}" placeholder="Cor/tom, se houver"><div class="quantity"><button data-decrement="${item.id}" aria-label="Diminuir quantidade de ${safe(product.name)}">−</button><span>${item.qty}</span><button data-increment="${item.id}" aria-label="Aumentar quantidade de ${safe(product.name)}">+</button><button class="remove-item" data-remove="${item.id}">Remover</button></div></div></div>`}).join(''):'<div class="bag-empty"><span>♡</span>Sua sacolinha está vazia. Escolha seus favoritos para começar.</div>';
}
function checkout(){
  if(!cart.length)return;
  const name=$('#customer-name').value.trim().slice(0,80);
  const cep=$('#customer-cep').value.trim().slice(0,15);
  const lines=['Olá, RZ Maquiagens! Gostaria de finalizar este pedido:','',...cart.map((item,index)=>`${index+1}. ${productForItem(item).name} — ${item.qty} un.${item.variant?` | Cor/tom: ${item.variant}`:''}`),'',...(name?[`Nome: ${name}`]:[]),...(cep?[`CEP para entrega: ${cep}`]:[]),'Por favor, confirmem valores, disponibilidade, frete e formas de pagamento.'];
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`,'_blank','noopener,noreferrer');
}

renderCategories();renderProducts();renderCart();$('#year').textContent=new Date().getFullYear();
$('#category-grid').addEventListener('click',event=>{const button=event.target.closest('[data-category]');if(!button)return;$('#category-filter').value=button.dataset.category==='Todos'?'todos':button.dataset.category;renderProducts();$('#colecao').scrollIntoView({behavior:'smooth'});});
$('#custom-product-form').addEventListener('submit',event=>{event.preventDefault();addCustomProduct($('#custom-product').value);});
$('#product-grid').addEventListener('click',event=>{const button=event.target.closest('[data-add]');if(button)addProduct(button.dataset.add);});
$('#category-filter').addEventListener('change',renderProducts);$('#sort-products').addEventListener('change',renderProducts);$('#site-search').addEventListener('input',renderProducts);
$('#search-toggle').addEventListener('click',()=>{const panel=$('#search-panel');panel.hidden=!panel.hidden;if(!panel.hidden)$('#site-search').focus();});$('#search-go').addEventListener('click',()=>$('#search-panel').hidden=true);
$('#menu-toggle').addEventListener('click',()=>{const open=$('#main-nav').classList.toggle('open');$('#menu-toggle').setAttribute('aria-expanded',String(open));});$('#main-nav').addEventListener('click',()=>{$('#main-nav').classList.remove('open');$('#menu-toggle').setAttribute('aria-expanded','false');});
$('#bag-toggle').addEventListener('click',openCart);$('#bag-close').addEventListener('click',closeCart);$('#drawer-overlay').addEventListener('click',closeCart);document.addEventListener('keydown',event=>{if(event.key==='Escape'&&$('#bag-drawer').classList.contains('open'))closeCart();});
$('#bag-items').addEventListener('click',event=>{const b=event.target.closest('button');if(!b)return;const id=b.dataset.increment||b.dataset.decrement||b.dataset.remove;const item=cart.find(item=>item.id===id);if(!item)return;if(b.dataset.remove)cart=cart.filter(item=>item.id!==id);else if(b.dataset.increment)item.qty=Math.min(99,item.qty+1);else if(b.dataset.decrement){item.qty--;if(item.qty<1)cart=cart.filter(item=>item.id!==id);}persist();});
$('#bag-items').addEventListener('input',event=>{const input=event.target.closest('[data-variant]');if(!input)return;const item=cart.find(item=>item.id===input.dataset.variant);if(item){item.variant=input.value.slice(0,70);localStorage.setItem('rz-cart',JSON.stringify(cart));}});
$('#checkout').addEventListener('click',checkout);
