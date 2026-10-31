const IMG = 'https://images.booking-channel.com/templates/cadenas/microsite6/images/eurostarscultura';

export const heroGallery = [
  { image: `${IMG}/pintandocuadro.jpg`, alt: 'Pintando cuadro art in progress' },
  { image: `${IMG}/espidofreire.jpg`, alt: 'Premio Narrativa de Viajes' },
  { image: `${IMG}/bosque_esculturas.jpg`, alt: 'Bosque de esculturas' },
  { image: `${IMG}/wb.jpg`, alt: 'Wine and Books Manuel Vilas' },
  { image: `${IMG}/AMAYA%20SUBERVIOLA_ARTE%20SANTANDER.jpg`, alt: 'Amaya Suberviola Arte Santander' },
];

export const mission = {
  number: '01',
  label: 'Quiénes somos',
  title: ['Nuestra', 'misión'],
  paragraphs: [
    'Desde 2005 desarrollamos un proyecto cultural que integra exposiciones, premios de fotografía y narrativa y acciones de mecenazgo; con el objetivo de apoyar y promover el arte, y de vincular nuestros hoteles con la vida cultural de sus destinos.',
    'Eurostars Hotel Company apuesta por convertir los hoteles de la cadena en una excelente plataforma de difusión de la cultura, entendiendo estos espacios como lugares de encuentro entre creación contemporánea y públicos diversos. Desarrollamos así un programa de exposiciones, en colaboración con galerías de arte del país, en algunos de los hoteles más emblemáticos de la cadena, como el Eurostars Grand Marina 5*G.L., el Eurostars Hotel Real 5*, el Áurea Washington Irving 5*, el Áurea Museum 5* y el Eurostars Gran Hotel La Toja 5*; con vistas a generar un impacto cultural positivo y duradero en su entorno.',
    'Paralelamente, hemos consolidado una trayectoria en la organización de premios de diversas disciplinas, que cuentan con una amplia y participación internacional. Estas convocatorias fomentan la creación, apoyan el talento emergente y generan nuevas oportunidades de difusión para sus autores.',
    'En el ámbito literario, desde 2015 organizamos el proyecto Wine & Books, un ciclo de encuentros gratuitos que reúne en nuestros hoteles más emblemáticos a escritores de prestigio con aficionados a la lectura. Más de 40 autores, entre ellos Javier Cercas, Santiago Posteguillo o Paloma Sánchez-Garnica, han participado en esta iniciativa cultural.',
  ],
  images: [
    `${IMG}/1500/cuadrocolorido.jpg`,
    `${IMG}/1500/schwepes.jpg`,
    `${IMG}/1500/pistilos.jpeg`,
  ],
};

export const programCards = [
  {
    label: 'Exposiciones',
    title: 'actuales en nuestros hoteles',
    desc: 'Descubre las exposiciones que organizamos en nuestros hoteles y sumérgete en el arte contemporáneo.',
    cta: 'Ver exposiciones',
    href: '/exposiciones',
    img: `${IMG}/1500/exposiciones-home.jpg`,
  },
  {
    label: 'Art in progress',
    title: 'Creación en directo',
    desc: 'Dos veces al año celebramos Art in Progress una iniciativa de acciones en vivo que ofrece al público la oportunidad de ver la creación de una obra de arte en directo en diferentes hoteles de la cadena.',
    cta: 'Descubrir',
    href: '/artinprogress',
    img: `${IMG}/1500/pintandocuadro.jpg`,
  },
  {
    label: 'Wine & Books',
    title: 'Catas literarias',
    desc: 'Ven a nuestras exclusivas catas literarias y conversa con los escritores más relevantes en un ambiente inspirador.',
    cta: 'Próximas citas',
    href: '/winebooks',
    img: `${IMG}/1500/javiersierra.jpg`,
  },
  {
    label: 'Premios',
    title: 'Premios',
    desc: 'Participa en nuestros concursos literarios y fotográficos, y gana interesantes premios.',
    cta: 'Próximas citas',
    href: '/premios',
    img: `${IMG}/1500/Pantalla%20est%C3%A1tica%20direccional%20-%20Recepci%C3%B3n%20(1920x1080%20px)%20PORTADA%20VIDEO.jpg`,
  },
];

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/exposiciones', label: 'Exposiciones' },
  { href: '/artinprogress', label: 'Art in progress' },
  { href: '/winebooks', label: 'Wine & Books' },
  { href: '/premios', label: 'Premios' },
];
