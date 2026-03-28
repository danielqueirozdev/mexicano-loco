'use client'
import { useEffect, useState } from 'react'

export default function Home() {
  const [scrolled, setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openFaq, setOpenFaq]     = useState(null)
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)

    const reveals = document.querySelectorAll('.reveal')
    const ro = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target) } })
    }, { threshold: 0.08 })
    reveals.forEach(r => ro.observe(r))

    const links = document.querySelectorAll('a[href^="#"]')
    const handleClick = (e) => {
      const t = document.querySelector(e.currentTarget.getAttribute('href'))
      if (t) { e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 70, behavior: 'smooth' }) }
    }
    links.forEach(a => a.addEventListener('click', handleClick))

    return () => { window.removeEventListener('scroll', onScroll); ro.disconnect(); links.forEach(a => a.removeEventListener('click', handleClick)) }
  }, [])

  const menuTabs = ['Tacos & Burritos', 'Entradas', 'Bebidas']

  const menuItems = [
    // Tacos & Burritos
    [
      { name: 'Taco Clássico', desc: 'Tortilha de milho, carne temperada, pico de gallo e coentro', price: 'R$16', img: '/taco.png' },
      { name: 'Taco Picante', desc: 'Carne apimentada, jalapeño, queijo e creme azedo', price: 'R$18', img: '/taco.png' },
      { name: 'Burrito Supreme', desc: 'Feijão, arroz, carne, queijo, guacamole e salsa', price: 'R$32', img: '/burrito.png' },
      { name: 'Burrito Frango', desc: 'Frango grelhado, feijão preto, arroz e pimenta', price: 'R$28', img: '/burrito.png' },
      { name: 'Quesadilla', desc: 'Tortilha crocante recheada com queijo derretido e carne', price: 'R$24', img: '/quesadilla.png' },
      { name: 'Taco Vegano', desc: 'Cogumelos salteados, feijão, abacate e salsa verde', price: 'R$16', img: '/taco.png' },
    ],
    // Entradas
    [
      { name: 'Nachos Supreme', desc: 'Nachos crocantes com queijo, jalapeño, guacamole e sour cream', price: 'R$28', img: '/nachos.png' },
      { name: 'Guacamole Fresh', desc: 'Abacate, limão, coentro, cebola e tomate — feito na hora', price: 'R$22', img: '/guacamole.png' },
      { name: 'Quesadilla Entrada', desc: 'Mini quesadillas com queijo e pimenta', price: 'R$18', img: '/quesadilla.png' },
      { name: 'Nachos com Carne', desc: 'Nachos com carne moída temperada e molho especial', price: 'R$32', img: '/nachos.png' },
    ],
    // Bebidas
    [
      { name: 'Margarita Clássica', desc: 'Tequila, triple sec, limão e sal na borda', price: 'R$28', img: '/margarita.png' },
      { name: 'Margarita de Frutas', desc: 'Com morango, manga ou maracujá', price: 'R$30', img: '/margarita.png' },
      { name: 'Agua Fresca', desc: 'Refrescante com hibisco, limão ou tamarindo', price: 'R$12', img: '/margarita.png' },
      { name: 'Refrigerante Lata', desc: 'Coca-Cola, Sprite ou Guaraná', price: 'R$8', img: '/margarita.png' },
    ],
  ]

  const destaques = [
    { name: 'Taco Clássico', desc: 'Tortilha de milho, carne temperada, pico de gallo e coentro fresco. O sabor que começou tudo.', price: 'R$16', img: '/taco.png', featured: false },
    { name: 'Burrito Supreme', desc: 'Recheado com feijão, arroz, carne, queijo, guacamole e salsa. O favorito da casa.', price: 'R$32', img: '/burrito.png', featured: true },
    { name: 'Nachos Supremo', desc: 'Nachos crocantes com queijo derretido, jalapeño, guacamole e sour cream artesanal.', price: 'R$28', img: '/nachos.png', featured: false },
  ]

  const faqs = [
    { q: 'Qual o tempo de entrega?', a: 'Entregamos em até 30 minutos na área de cobertura. Em horários de pico pode chegar a 40 minutos — mas sempre quentinho!' },
    { q: 'Têm opções vegetarianas e veganas?', a: 'Sim! Temos tacos veganos com cogumelos, feijão e abacate, além de burritos vegetarianos. Tudo preparado com o mesmo cuidado e sabor.' },
    { q: 'Quais formas de pagamento aceitam?', a: 'Aceitamos Pix, cartão de crédito e débito (todas as bandeiras) e dinheiro. Para delivery, informe na hora do pedido.' },
    { q: 'Fazem pedidos para grupos e eventos?', a: 'Sim! Atendemos pedidos grandes para festas e eventos. Entre em contato pelo WhatsApp com pelo menos 24h de antecedência.' },
    { q: 'Qual o horário de funcionamento?', a: 'Funcionamos de segunda a domingo, das 11h às 23h. Nos fins de semana abrimos às 10h.' },
  ]

  return (
    <>
      {/* STICKY */}
      <a href="https://wa.me/5511999999999?text=Quero%20fazer%20um%20pedido!" className="sticky-cta" target="_blank" rel="noopener">
        🌮 Pedir Agora
      </a>

      {/* MOBILE MENU */}
      <div className={`mob-menu${mobileOpen ? ' open' : ''}`}>
        <button className="mob-close" onClick={() => setMobileOpen(false)}>✕ fechar</button>
        <a href="#hero"        onClick={() => setMobileOpen(false)}>Home</a>
        <a href="#destaques"   onClick={() => setMobileOpen(false)}>Menu</a>
        <a href="#sobre"       onClick={() => setMobileOpen(false)}>Sobre</a>
        <a href="#faq"         onClick={() => setMobileOpen(false)}>Contato</a>
      </div>

      {/* NAVBAR */}
      <nav className={scrolled ? 'scrolled' : ''}>
        <a href="#hero" className="nav-logo">
          <span className="nav-logo-main">Mexicano <span>Loco</span></span>
          <span className="nav-logo-sub">Tacos &amp; Burritos</span>
        </a>
        <ul className="nav-links">
          <li><a href="#hero">Home</a></li>
          <li><a href="#destaques">Menu</a></li>
          <li><a href="#sobre">Sobre</a></li>
          <li><a href="#faq">Contato</a></li>
          <li>
            <a href="https://wa.me/5511999999999?text=Quero%20fazer%20um%20pedido!" className="btn-nav-cta" target="_blank" rel="noopener">
              Pedir Agora
            </a>
          </li>
        </ul>
        <button className="hamburger" onClick={() => setMobileOpen(true)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* ══ HERO ══ */}
      <section id="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-pattern" />

        <div className="hero-inner">
          <p className="hero-pre reveal">You will be amazed</p>

          <h1 className="hero-headline reveal" style={{ transitionDelay: '.1s' }}>
            Sabor Intenso,<br />
            <span>Picante &amp;</span>
            Autêntico.
          </h1>

          <p className="hero-sub reveal" style={{ transitionDelay: '.2s' }}>
            Tacos, burritos e combinações que explodem em sabor a cada mordida.
          </p>

          <div className="hero-btns reveal" style={{ transitionDelay: '.3s' }}>
            <a href="https://wa.me/5511999999999?text=Quero%20fazer%20um%20pedido!" className="btn-yellow" target="_blank" rel="noopener">
              🌮 Pedir Agora
            </a>
            <a href="#destaques" className="btn-outline">
              Ver Cardápio →
            </a>
          </div>
        </div>

        {/* Floating info badges */}
        <div className="hero-badge">
          <div className="hbadge">
            <span className="hbadge-icon">⚡</span>
            <div className="hbadge-text"><strong>30 min</strong>Entrega rápida</div>
          </div>
          <div className="hbadge">
            <span className="hbadge-icon">🌶️</span>
            <div className="hbadge-text"><strong>100% Fresco</strong>Feito na hora</div>
          </div>
        </div>
      </section>

      {/* ══ DESTAQUES ══ */}
      <section id="destaques">
        <div className="dest-inner">
          <div className="dest-header">
            <div className="sec-tag reveal">⭐ Favoritos</div>
            <h2 className="sec-title reveal" style={{ transitionDelay: '.1s' }}>
              Mais <span>Pedidos</span>
            </h2>
            <p className="sec-sub reveal" style={{ transitionDelay: '.15s', margin: '0 auto' }}>
              Os pratos que fazem nossos clientes voltarem toda semana
            </p>
          </div>
          <div className="dest-grid">
            {destaques.map((item, i) => (
              <div className={`dest-card reveal${item.featured ? ' featured' : ''}`} key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="card-img-wrap">
                  <img src={item.img} alt={item.name} />
                </div>
                <div className="card-body">
                  <div className="card-name">{item.name}</div>
                  <p className="card-desc">{item.desc}</p>
                  <div className="card-footer">
                    <div className="card-price">
                      <small>a partir de</small>
                      {item.price}
                    </div>
                    <a href="https://wa.me/5511999999999" className="btn-card" target="_blank" rel="noopener">
                      Pedir →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CARDÁPIO ══ */}
      <section id="cardapio">
        <div className="menu-inner">
          <div className="menu-header reveal">
            <div className="sec-tag">📋 Menu Completo</div>
            <h2 className="sec-title" style={{ marginTop: '8px' }}>
              Cardápio <span>Completo</span>
            </h2>
          </div>

          <div className="menu-tabs reveal" style={{ transitionDelay: '.1s' }}>
            {menuTabs.map((tab, i) => (
              <button
                key={i}
                className={`menu-tab${activeTab === i ? ' active' : ''}`}
                onClick={() => setActiveTab(i)}
              >
                {tab}
              </button>
            ))}
          </div>

          {menuTabs.map((_, tabIdx) => (
            <div className={`menu-section reveal${activeTab === tabIdx ? ' active' : ''}`} key={tabIdx} style={{ transitionDelay: '.15s' }}>
              {menuItems[tabIdx].map((item, i) => (
                <div className="menu-item" key={i}>
                  <div className="menu-item-left">
                    <div className="menu-item-img">
                      <img src={item.img} alt={item.name} />
                    </div>
                    <div>
                      <div className="menu-item-name">{item.name}</div>
                      <div className="menu-item-desc">{item.desc}</div>
                    </div>
                  </div>
                  <div className="menu-item-price">{item.price}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ══ SOBRE ══ */}
      <section id="sobre">
        <div className="sobre-inner">
          <div className="sobre-img">
            <img src="/ingredients.png" alt="Ingredientes frescos" />
          </div>
          <div className="sobre-content">
            <div className="sec-tag reveal">🌿 Nossa História</div>
            <h2 className="sec-title reveal" style={{ transitionDelay: '.1s', marginTop: '12px' }}>
              Ingredientes <span>Frescos,</span><br />
              Receitas Autênticas
            </h2>
            <p className="sec-sub reveal" style={{ transitionDelay: '.2s', maxWidth: '420px' }}>
              No Mexicano Loco, cada ingrediente é selecionado com cuidado. Usamos tortilhas de milho artesanais, carnes temperadas na hora e molhos preparados diariamente com pimentas e ervas frescas.
            </p>
            <p className="sec-sub reveal" style={{ transitionDelay: '.25s', maxWidth: '420px', marginTop: '16px' }}>
              Nossa cozinha é inspirada na tradição mexicana mais autêntica — sem atalhos, sem congelados, sem concessões no sabor.
            </p>
            <div className="hero-btns reveal" style={{ transitionDelay: '.3s', marginTop: '36px' }}>
              <a href="https://wa.me/5511999999999?text=Quero%20fazer%20um%20pedido!" className="btn-yellow" target="_blank" rel="noopener">
                Pedir Agora 🌮
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ DIFERENCIAIS ══ */}
      <section id="diferenciais">
        <div className="difs-inner">
          <div className="difs-header">
            <div className="sec-tag reveal">⚡ Por que nós</div>
            <h2 className="sec-title reveal" style={{ transitionDelay: '.1s', textAlign: 'center' }}>
              Por que o <span>Mexicano Loco?</span>
            </h2>
          </div>
          <div className="difs-grid">
            {[
              { icon: '🌮', title: 'Receita Autêntica', text: 'Temperos e técnicas tradicionais mexicanas preparados com respeito à origem.' },
              { icon: '🌿', title: 'Ingredientes Frescos', text: 'Tudo preparado no dia — sem conservantes, sem congelados, sem concessões.' },
              { icon: '⚡', title: 'Entrega em 30 min', text: 'Pedido no WhatsApp e na sua porta em até 30 minutos, quentinho e crocante.' },
              { icon: '🌶️', title: 'Nível de Picância', text: 'Escolha do suave ao extremo — personalizamos o calor do sabor pra você.' },
            ].map((item, i) => (
              <div className="dif-item reveal" key={i} style={{ transitionDelay: `${i * 0.08}s` }}>
                <span className="dif-icon">{item.icon}</span>
                <div className="dif-title">{item.title}</div>
                <p className="dif-text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ OFERTA ══ */}
      <section id="oferta">
        <div className="oferta-inner">
          <span className="oferta-tag reveal">🎁 Promoção Especial</span>
          <h2 className="oferta-title reveal" style={{ transitionDelay: '.1s' }}>
            Peça acima de R$50<br />e ganhe nachos grátis
          </h2>
          <p className="oferta-sub reveal" style={{ transitionDelay: '.2s' }}>
            Válido todos os dias pelo WhatsApp • Enquanto durar o estoque
          </p>
          <a
            href="https://wa.me/5511999999999?text=Quero%20aproveitar%20a%20promo%20dos%20nachos%20gr%C3%A1tis!"
            className="btn-black reveal"
            style={{ transitionDelay: '.3s' }}
            target="_blank" rel="noopener"
          >
            🚀 Aproveitar Agora
          </a>
        </div>
      </section>

      {/* ══ DEPOIMENTOS ══ */}
      <section id="depoimentos">
        <div className="deps-inner">
          <div className="deps-header">
            <div className="sec-tag reveal">💬 Clientes</div>
            <h2 className="sec-title reveal" style={{ transitionDelay: '.1s', textAlign: 'center' }}>
              O que dizem <span>sobre nós</span>
            </h2>
          </div>
          <div className="deps-grid">
            {[
              { name: 'Carlos M.', loc: 'São Paulo, SP', text: 'Melhor taco que já comi fora do México! O burrito supreme é ridiculamente bom. Entrega veio em 25 minutos.' },
              { name: 'Ana P.', loc: 'Campinas, SP', text: 'O guacamole é incrivelmente fresco e os nachos são viciantes. Já pedi três vezes essa semana!' },
              { name: 'Rafael K.', loc: 'São Paulo, SP', text: 'Finalmente um mexicano de verdade na cidade. Picância no ponto e ingredientes que você consegue sentir a frescura.' },
            ].map((dep, i) => (
              <div className="dep-card reveal" key={i} style={{ transitionDelay: `${i * 0.12}s` }}>
                <div className="dep-top">
                  <div className="dep-avatar">{dep.name[0]}</div>
                  <div>
                    <span className="dep-name">{dep.name}</span>
                    <span className="dep-loc">{dep.loc}</span>
                  </div>
                </div>
                <div className="dep-stars">★★★★★</div>
                <p className="dep-text">&ldquo;{dep.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section id="faq">
        <div className="faq-inner">
          <div className="faq-header">
            <div className="sec-tag reveal">❓ Dúvidas</div>
            <h2 className="sec-title reveal" style={{ transitionDelay: '.1s', textAlign: 'center' }}>
              Perguntas <span>Frequentes</span>
            </h2>
          </div>
          <div className="reveal" style={{ transitionDelay: '.15s' }}>
            {faqs.map((faq, i) => (
              <div className={`faq-item${openFaq === i ? ' open' : ''}`} key={i}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {faq.q}
                  <span className="faq-ic">+</span>
                </button>
                <div className="faq-a">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer>
        <div className="ft-inner">
          <div>
            <a href="#hero" className="ft-logo-main">Mexicano <span>Loco</span></a>
            <span className="ft-logo-sub">Tacos &amp; Burritos Autênticos</span>
            <p className="ft-tag">Sabor intenso, picante e autêntico — feito com ingredientes frescos e receitas mexicanas tradicionais.</p>
            <a href="https://wa.me/5511999999999" className="ft-link" target="_blank" rel="noopener"><span>💬</span>(11) 99999-9999</a>
            <a href="https://instagram.com/mexicanoloco" className="ft-link" target="_blank" rel="noopener"><span>📸</span>@mexicanoloco</a>
            <a href="#" className="ft-link"><span>📍</span>Rua das Especiarias, 77 — São Paulo</a>
          </div>
          <div>
            <div className="ft-col-title">Menu Rápido</div>
            <ul className="ft-links">
              {[['#hero','Home'],['#destaques','Mais Pedidos'],['#cardapio','Cardápio'],['#sobre','Sobre nós'],['#faq','Contato']].map(([href, label]) => (
                <li key={href}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="ft-col-title">Horários</div>
            <ul className="ft-links">
              <li><a href="#">Seg–Sex: 11h–23h</a></li>
              <li><a href="#">Sáb–Dom: 10h–23h</a></li>
              <li><a href="https://wa.me/5511999999999" target="_blank" rel="noopener">Fazer Pedido →</a></li>
            </ul>
          </div>
        </div>
        <div className="ft-bottom">
          <span className="ft-copy">© 2025 Mexicano Loco Tacos. Todos os direitos reservados.</span>
          <span className="ft-emoji">🌮🌶️🇲🇽</span>
        </div>
      </footer>
    </>
  )
}
