(function(){
const slug=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const hash=s=>{let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0};

const FAM={
 floral:{label:'Floral',icon:'Flower2',pal:['#e7a9b9','#f5d6de','#b9667e'],liqs:['#f3c2cf','#f6dce2','#eab0bf'],desc:'Pétalos frescos, ramos blancos y rosas. Romántico, luminoso y femenino.',
  notes:[['Bergamota','Pera'],['Rosa','Jazmín','Peonía'],['Almizcle','Cedro']],
  phrases:['Me recuerda a un ramo robado del jardín de la abuela, escondido detrás de la espalda.','Una boda en el campo, pétalos en el aire y alguien que te pide el último baile.','Domingo de mercado de flores, el pelo todavía mojado y el día entero por delante.','Una carta perfumada que llegó tarde, pero justo a tiempo.','Caminar descalza por un invernadero al amanecer, cuando todo aún huele a rocío.']},
 frutal:{label:'Frutal',icon:'Cherry',pal:['#f29e7c','#ffd3a8','#e2566b'],liqs:['#f6b39a','#f9c9a4','#ee8e8e'],desc:'Jugoso, alegre y vibrante: frutos rojos, pera, durazno. Energía que sonríe.',
  notes:[['Frutos rojos','Mandarina'],['Durazno','Flor de azahar'],['Almizcle','Vainilla']],
  phrases:['Un picnic de verano con sandía fría y risas que no se acaban.','Morder un durazno maduro en un mercado de pueblo, con el jugo corriendo por la muñeca.','La primera cita en una feria, algodón de azúcar y la rueda de la fortuna en lo alto.','Una limonada de frutos rojos en una terraza, y una canción que suena a ti.','Un viaje de amigas a la playa, la radio alta y el carro oliendo a fruta fresca.']},
 dulce:{label:'Dulce',icon:'CakeSlice',pal:['#f2c6d4','#e8c39e','#b9799a'],liqs:['#f1c9d6','#ecd0ae','#e6b6c4'],desc:'Gourmand: vainilla, caramelo y praliné. Un abrazo que se antoja.',
  notes:[['Pera','Mandarina'],['Praliné','Caramelo','Jazmín'],['Vainilla','Haba tonka']],
  phrases:['Una pastelería de esquina en diciembre, vidrios empañados y chocolate caliente en las manos.','El abrazo largo de alguien que te esperó en el aeropuerto.','Hornear galletas a medianoche, harina en la nariz y nadie apurándote.','Una cobija suave, una película vieja y vainilla flotando en el aire.','El beso con sabor a caramelo que nunca olvidaste.']},
 citrico:{label:'Cítrico',icon:'Citrus',pal:['#f4dc6b','#fff4c2','#b7cf5a'],liqs:['#f6e48d','#eef2a8','#f8dc84'],desc:'Limón, bergamota y toronja. Energía limpia, brillante y diurna.',
  notes:[['Limón','Bergamota','Toronja'],['Neroli','Menta'],['Almizcle','Vetiver']],
  phrases:['Abrir las ventanas un lunes de sol y sentir que todo es posible.','Un huerto de limones en Sicilia, a las diez de la mañana.','La primera ducha después de un viaje largo, camisa blanca recién planchada.','Una bicicleta por la costa con el viento a favor.','Un mojito en la terraza y el atardecer pintando la ciudad de naranja.']},
 acuatico:{label:'Acuático',icon:'Waves',pal:['#6fb3d6','#cfe9f2','#2d6f9a'],liqs:['#9fd0e8','#bfe3ef','#7ab8d8'],desc:'Mar, brisa y sal. Una frescura que se siente como respirar hondo.',
  notes:[['Notas marinas','Limón'],['Lavanda','Salvia'],['Ámbar gris','Cedro']],
  phrases:['Una escapada a la playa bajo la luna llena, con el mar a los pies.','Zambullirse en agua helada en una cala escondida.','Navegar al amanecer, cuando el mar está quieto y el mundo aún duerme.','La brisa salada entrando por la ventana de una casa frente al mar.','Caminar por la orilla después de la tormenta, con el cielo recién lavado.']},
 aromatico:{label:'Aromático',icon:'Leaf',pal:['#9bb59a','#c9b8de','#5f7d5e'],liqs:['#bcd3b4','#cdc3e0','#a9c2a3'],desc:'Lavanda, hierbas y fougère. Elegancia limpia, clásica y segura.',
  notes:[['Bergamota','Lavanda'],['Geranio','Salvia','Romero'],['Haba tonka','Vetiver']],
  phrases:['Un campo de lavanda en la Provenza, abejas zumbando y el sol de la tarde.','La barbería de siempre, una toalla caliente y una conversación sin prisa.','Un jardín de hierbas después de la lluvia, romero y menta entre los dedos.','Un traje recién estrenado y la seguridad de que hoy todo sale bien.','Una caminata por la montaña al amanecer, el aire limpio llenándote los pulmones.']},
 amaderado:{label:'Amaderado',icon:'Trees',pal:['#8a6142','#c9a37e','#3f2c20'],liqs:['#c99a6b','#b98457','#d7b089'],desc:'Cedro, sándalo, oud y cuero. Profundidad, carácter y calma.',
  notes:[['Pimienta','Bergamota'],['Cedro','Pachulí'],['Sándalo','Oud','Cuero']],
  phrases:['Una cabaña en el bosque, la chimenea encendida y la lluvia golpeando el techo.','La biblioteca del abuelo, libros antiguos y un sillón de cuero gastado.','Un paseo por un bosque de pinos en otoño, hojas crujiendo bajo las botas.','Un whisky añejo junto al fuego y una historia que nadie más conoce.','El taller de un carpintero, aserrín dorado flotando en la luz de la tarde.']},
 oriental:{label:'Ámbar · Oriental',icon:'Flame',pal:['#c27a2c','#e8b56a','#6e2a2a'],liqs:['#d99a4e','#c9773a','#e0ad62'],desc:'Ámbar, especias y almizcle. Cálido, sensual y nocturno.',
  notes:[['Azafrán','Canela'],['Ámbar','Incienso','Rosa'],['Vainilla','Almizcle','Oud']],
  phrases:['Un mercado de especias al anochecer, faroles encendidos y un perfume que te sigue.','Una noche en el desierto bajo mil estrellas, con té de cardamomo y música lejana.','Una cena a la luz de las velas en la que nadie mira el reloj.','Seda, incienso y una mirada que lo dice todo.','Una fiesta en un palacio árabe, oro en las paredes y ámbar en la piel.']}
};
const ORDER=['floral','frutal','dulce','citrico','acuatico','aromatico','amaderado','oriental'];
const KW=[['acuatico',/acu[aá]tic|marin|oz[oó]nic/],['citrico',/c[ií]tric|fresc/],['floral',/floral|flor|rosa|aldeh|iris/],['frutal',/frut|tropical|fruity/],['dulce',/dulce|vainill|caramel|cacao|lact[oó]nic|gourmand|almendr|musgo dulce/],['amaderado',/amader|oud|cuero|tabaco|musgo|chipre|pachul|vetiver/],['aromatic'+'o',/arom[aá]tic|foug|lavanda|herbal|verde/],['oriental',/[aá]mbar|oriental|especi|c[aá]lido|almizcl|amizcl|atalcad|anim[aá]l|bals[aá]m/]];
function famsOf(raw){const r=raw.toLowerCase();const f=[];for(const [k,re] of KW){const m=r.search(re);if(m>=0)f.push([m,k]);}f.sort((a,b)=>a[0]-b[0]);let ks=f.map(x=>x[1]);if(ks.includes('acuatico'))ks=['acuatico',...ks.filter(k=>k!=='acuatico')];return ks.length?ks:['oriental'];}

const NICHO=['Creed','Parfums de Marly','Xerjoff','Kilian','Louis Vuitton','Le Labo','Maison Francis Kurkdjian','Montale','Bond No. 9'];
const ARABE=['Lattafa','Armaf','Afnan','Bharara','Orientica','Al Haramain','Rasasi','Ahli','French Avenue','Zakat','Kajal','Emper','Dumont','Tubbees'];

const LINES=`Fame|Paco Rabanne|80|Floral Amaderado|F
Lady Million|Paco Rabanne|80|Floral Frutal|F
Lady Million Privé|Paco Rabanne|80|Chipre Floral|F
Lady Million Empire|Paco Rabanne|80|Ámbar Floral|F
Lady Million Fabulous|Paco Rabanne|80|Ámbar Floral|F
Olympéa|Paco Rabanne|80|Floral Avainillado|F
Pure XS for Her|Paco Rabanne|80|Oriental Floral|F
Fame Blooming Pink|Paco Rabanne|80|Frutal Oriental|F
Good Girl|Carolina Herrera|80|Oriental Floral|F
Very Good Girl|Carolina Herrera|80|Oriental Floral Dulce|F
Good Girl Légère|Carolina Herrera|80|Oriental Floral|F
Good Girl Blush|Carolina Herrera|80|Chipre Floral|F
Good Girl Blush Elixir|Carolina Herrera|80|Dulce Floral|F
Good Girl Fantastic Pink|Carolina Herrera|80|Oriental Floral|F
CH Fem|Carolina Herrera|100|Ámbar Floral|F
212 Sexy|Carolina Herrera|100|Oriental Floral|F
212 VIP Rosé|Carolina Herrera|80|Floral Frutal|F
212 VIP Red|Carolina Herrera|80|Floral Frutal|F
212 VIP Wild Party|Carolina Herrera|80|Floral Blanco|F
212 VIP NY Party|Carolina Herrera|80|Floral Dulce|F
212 VIP Wins|Carolina Herrera|80|Floral Cítrico|F
CH Africa|Carolina Herrera|100|Ámbar Floral|F
CH Hot!|Carolina Herrera|100|Dulce Amaderado|F
Carolina|Carolina Herrera|100|Floral Cítrico|F
Carolina Herrera|Carolina Herrera|100|Floral Amaderado|F
Dylan Blue pour Femme|Versace|100|Floral Frutal|F
Dylan Turquoise|Versace|100|Floral Frutal|F
Bright Crystal|Versace|90|Floral Frutal|F
Bright Crystal Absolu|Versace|100|Floral Frutal|F
Yellow Diamond|Versace|90|Floral Dulce|F
Omnia Crystalline|Bvlgari|65|Almizcle Floral|F
Omnia Golden Citrine|Bvlgari|65|Ámbar Floral|F
Omnia Amethyste|Bvlgari|65|Floral Acuática|F
Omnia Paraiba|Bvlgari|65|Floral Frutal|F
Omnia Coral|Bvlgari|65|Floral Frutal|F
Fantasy|Britney Spears|100|Dulce Afrutado|F
N°5|Chanel|100|Floral Aldehído|F
Coco|Chanel|100|Ámbar Especiada|F
Chance|Chanel|100|Chipre Floral|F
Chance Eau Fraîche|Chanel|100|Chipre Floral|F
Chance Eau Tendre|Chanel|100|Floral Frutal|F
Gabrielle|Chanel|100|Floral|F
Touch of Pink|Lacoste|90|Floral Frutal|F
Lacoste Sparkling|Lacoste|100|Floral Frutal|F
Lacoste Magnetic|Lacoste|100|Floral Frutal|F
Pour Elle Elegant|Lacoste|100|Almizcle Floral|F
Funny!|Moschino|100|Floral Frutal|F
Toy 2|Moschino|100|Floral Amaderado|F
Toy 2 Bubble Gum|Moschino|100|Floral Frutal|F
Toy 2 Pearl|Moschino|100|Floral Frutal|F
Pink Fresh Couture|Moschino|100|Floral Frutal|F
Cheap & Chic|Moschino|100|Floral Frutal|F
I Love Love|Moschino|65|Almizcle Floral|F
Light Blue|Dolce & Gabbana|100|Cítrica Floral Frutal|F
Light Blue Italian Love|Dolce & Gabbana|100|Almizcle Floral|F
Light Blue Love is Love|Dolce & Gabbana|100|Floral Amaderado|F
L'Impératrice|Dolce & Gabbana|100|Pachulí Cítrico|F
The One|Dolce & Gabbana|75|Avainillado Atalcado|F
Ralph|Ralph Lauren|100|Floral Frutal|F
Ralph Fresh|Ralph Lauren|100|Floral Frutal|F
Big Pony 2|Ralph Lauren|100|Floral Frutal|F
Cloud|Ariana Grande|100|Floral Frutal|F
Cloud Pink|Ariana Grande|100|Oriental Vainilla|F
Cloud Intense|Ariana Grande|100|Oriental Vainilla|F
R.E.M.|Ariana Grande|100|Ámbar Vainilla|F
Sweet Like Candy|Ariana Grande|100|Floral Frutal|F
Thank U, Next|Ariana Grande|100|Floral Frutal|F
Thank U, Next 2.0|Ariana Grande|100|Floral Frutal|F
Mod Vanilla|Ariana Grande|100|Dulce Vainilla|F
Dazzle|Paris Hilton|125|Afrutado Floral|F
Can Can|Paris Hilton|100|Oriental Floral|F
Heiress|Paris Hilton|100|Floral Frutal|F
Gold Rush|Paris Hilton|100|Floral Frutal|F
Agua del Sol|Escada|100|Oriental Floral|F
Sorbetto Rosso|Escada|100|Aromática Frutal|F
Bombshell|Victoria's Secret|100|Oriental Floral|F
Bombshell Intense|Victoria's Secret|100|Chipre Floral|F
Angel Gold|Victoria's Secret|100|Floral Frutal|F
Sì|Giorgio Armani|100|Avainillado Aromático|F
J'adore|Dior|100|Floral Frutal|F
Miss Dior|Dior|100|Oriental Floral|F
Joy|Dior|100|Floral Amaderado|F
360° Fem|Perry Ellis|100|Floral|F
360° Coral|Perry Ellis|100|Ámbar Floral|F
Ange ou Démon|Givenchy|100|Floral Ámbar|F
L'Eau d'Issey|Issey Miyake|100|Floral Acuática|F
Black Opium Floral Shock|Yves Saint Laurent|90|Floral Frutal|F
Scandal|Jean Paul Gaultier|80|Chipre Floral|F
Meow|Katy Perry|100|Floral Frutal|F
The Scent for Her|Hugo Boss|100|Floral Frutal|F
CK IN2U Her|Calvin Klein|100|Ámbar Floral|F
Be Delicious|DKNY|100|Floral Frutal|F
Burberry Women|Burberry|100|Floral Frutal|F
Burberry Her|Burberry|100|Afrutado Atalcado|F
Euphoria|Calvin Klein|100|Ámbar Floral|F
Tommy Girl|Tommy Hilfiger|100|Floral Frutal|F
La Vie Est Belle|Lancôme|75|Dulce Avainillado|F
Flower by Kenzo|Kenzo|100|Oriental Floral|F
La Belle|Jean Paul Gaultier|100|Oriental Vainilla|F
La Belle Paradise Garden|Jean Paul Gaultier|100|Fresca Frutal|F
Beverly Hills|Beverly Hills|100|Floral Frutal|F
Halloween|Jesús del Pozo|100|Oriental Floral|F
Yara|Lattafa|100|Ámbar Vainilla|F
Yara Tous|Lattafa|100|Tropical Dulce|F
Yara Moi|Lattafa|100|Floral Amaderado|F
Yara Candy|Lattafa|100|Frutal Dulce|F
Yara Elixir|Lattafa|100|Avainillado Dulce|F
Mallow Madness|Lattafa|100|Dulce Afrutado|F
Whipped Pleasure|Lattafa|100|Lactónico Dulce|F
Berry on Top|Lattafa|100|Lactónico Dulce|F
Choco Overdose|Lattafa|100|Cacao Avainillado|F
Vanilla Freak|Lattafa|100|Dulce Almendrado|F
Cookie Crave|Lattafa|100|Dulce Avainillado|F
Eclaire|Lattafa|100|Dulce Caramelo|F
Mayar|Lattafa|100|Afrutado Fresco|F
Mayar Natural Intense|Lattafa|100|Floral Ozónico|F
Victoria|Lattafa|100|Avainillado Floral Blanco|F
Bharara Rose|Bharara|100|Oriental Floral|F
Bharara Niche Femme|Bharara|100|Rosas Ahumado|F
9 AM pour Femme|Afnan|100|Frutal Oriental|F
Odyssey Candee|Armaf|100|Afrutado Fresco Especiado|F
Yum Yum|Armaf|100|Afrutado Dulce Atalcado|F
Ruby|Kajal|100|Oriental Vainilla|F
Blueberry Sorbet|Tubbees|50|Floral Frutal|F
Berry Explosion|Tubbees|50|Floral Frutal Gourmand|F
Fakhar Rose|Lattafa|100|Floral Dulce|F
Delina|Parfums de Marly|100|Floral|F
Carmina|Creed|100|Rosas Acerezado|F
1 Million|Paco Rabanne|100|Amaderada Especiada|M
1 Million Lucky|Paco Rabanne|100|Dulce Amaderada|M
1 Million Privé|Paco Rabanne|100|Oriental Amaderada|M
1 Million Elixir|Paco Rabanne|100|Amaderada Aromática|M
1 Million Royal|Paco Rabanne|100|Amaderada Aromática|M
1 Million Parfum|Paco Rabanne|100|Ámbar Amaderada|M
1 Million Gold|Paco Rabanne|100|Amaderado Atalcado|M
1 Million Golden Oud|Paco Rabanne|100|Amaderado Pachulí|M
Invictus|Paco Rabanne|100|Aromática Acuática|M
Invictus Legend|Paco Rabanne|100|Amaderada Acuática|M
Invictus Intense|Paco Rabanne|100|Ámbar Amaderado|M
Invictus Onyx|Paco Rabanne|100|Cítrico Amaderado|M
Invictus Aqua|Paco Rabanne|100|Aromática Acuática|M
Invictus Parfum|Paco Rabanne|100|Marina Acuática|M
Invictus Victory|Paco Rabanne|100|Avainillado Ámbar|M
Black XS|Paco Rabanne|100|Oriental Amaderada|M
Black XS L'Excès|Paco Rabanne|100|Aromático Cítrico|M
Black XS L'Aphrodisiaque|Paco Rabanne|100|Cálido Especiado|M
Pure XS|Paco Rabanne|100|Dulce Especiada|M
Phantom|Paco Rabanne|150|Amaderada Aromática|M
Phantom Parfum|Paco Rabanne|100|Dulce Amaderada|M
212 VIP Men|Carolina Herrera|100|Aromática Amaderada|M
212 VIP Black|Carolina Herrera|100|Aromática Fougère|M
212 VIP Club Edition|Carolina Herrera|100|Amaderada Especiada|M
212 VIP Men Wins|Carolina Herrera|100|Aromática Cítrica|M
212 Men Heroes|Carolina Herrera|90|Aromática Frutal|M
212 Sexy Men|Carolina Herrera|100|Ámbar Fougère|M
212 Men|Carolina Herrera|100|Fresca Especiada|M
CH Men|Carolina Herrera|100|Ámbar Especiada|M
Acqua di Giò|Giorgio Armani|100|Aromática Acuática|M
Acqua di Giò Absolu|Giorgio Armani|100|Aromática Acuática|M
Acqua di Giò Profumo|Giorgio Armani|100|Fresca Especiada|M
Acqua di Giò Profondo|Giorgio Armani|100|Aromática Fougère|M
Stronger With You|Emporio Armani|100|Aromática Fougère|M
Polo Blue|Ralph Lauren|125|Aromática Fougère|M
Boss Bottled|Hugo Boss|100|Aromática Fougère|M
Boss Bottled Unlimited|Hugo Boss|100|Aromática Fougère|M
Boss Bottled Night|Hugo Boss|100|Amaderada Especiada|M
Boss in Motion|Hugo Boss|90|Ámbar Fougère|M
Boss The Scent|Hugo Boss|100|Aromática Especiada|M
Hugo Dark Blue|Hugo Boss|100|Oriental Especiada|M
Hugo Red|Hugo Boss|100|Amaderada Especiada|M
Hugo Just Different|Hugo Boss|100|Aromática Fresca Especiada|M
Hugo Man|Hugo Boss|100|Aromática Fresca Especiada|M
Hugo Iced|Hugo Boss|100|Aromática Acuática|M
L.12.12 Blanc|Lacoste|100|Amaderada Aromática|M
L.12.12 Blue|Lacoste|100|Chipre|M
L.12.12 Vert|Lacoste|100|Amaderada Aromática|M
L.12.12 Noir|Lacoste|100|Amaderada Aromática|M
L.12.12 Rouge|Lacoste|100|Amaderada Especiada|M
Lacoste pour Homme|Lacoste|100|Amaderada Aromática|M
Lacoste Red|Lacoste|125|Aromática Fougère|M
Lacoste L!ve|Lacoste|100|Amaderada Acuática|M
Man in Black|Bvlgari|100|Ámbar Floral|M
Bvlgari Aqva|Bvlgari|100|Amaderada Acuática|M
Fahrenheit|Dior|100|Amaderado Cuero|M
Sauvage|Dior|100|Aromática Fougère|M
Sauvage Elixir|Dior|60|Aromática Especiada|M
Givenchy Blue Label|Givenchy|100|Amaderada Especiada|M
Legend|Montblanc|100|Aromática Fougère|M
Legend Red|Montblanc|100|Cítrico Amaderado|M
Legend Spirit|Montblanc|100|Amaderada Aromática|M
Emblem|Montblanc|100|Cálido Especiado Cítrico|M
Starwalker|Montblanc|75|Fresco Especiado|M
Versace pour Homme|Versace|100|Amaderada Acuática|M
Eros|Versace|100|Avainillada Aromática|M
Eros Flame|Versace|100|Amaderada Especiada|M
Eros Energy|Versace|100|Cítrico Fresco Especiado|M
L'Eau d'Issey pour Homme|Issey Miyake|125|Cítrica Aromática|M
Bleu de Chanel|Chanel|100|Amaderada Especiada|M
Allure Homme Sport|Chanel|100|Fresca Especiada|M
360° Red|Perry Ellis|100|Aromática Fresca|M
360° for Men|Perry Ellis|100|Aromática Fresca|M
Toy Boy|Moschino|100|Amaderada Especiada|M
Light Blue pour Homme|Dolce & Gabbana|125|Aromático Cítrico|M
K by Dolce & Gabbana|Dolce & Gabbana|100|Amaderada Aromática|M
The One for Men|Dolce & Gabbana|100|Amaderada Especiada|M
Only The Brave|Diesel|75|Ámbar Amaderada|M
Only The Brave Tattoo|Diesel|125|Amaderada Especiada|M
Declaration|Cartier|100|Cítrica Aromática|M
Eternity for Men|Calvin Klein|100|Aromática Fougère|M
Aventus|Creed|100|Cítrica Aromática|M
Silver Mountain Water|Creed|100|Cítrica Aromática|M
Green Irish Tweed|Creed|100|Almizcle Amaderado|M
Original Vetiver|Creed|100|Amaderada Especiada|M
Original Santal|Creed|100|Oriental Amaderada|M
Millésime Impérial|Creed|100|Amaderado Floral|U
Le Male|Jean Paul Gaultier|125|Amaderada Aromática|M
Ultra Male|Jean Paul Gaultier|100|Ámbar Fougère|M
Le Beau|Jean Paul Gaultier|125|Ámbar Fougère|M
Le Male Elixir|Jean Paul Gaultier|125|Avainillado Atalcado|M
Le Beau Paradise Garden|Jean Paul Gaultier|125|Verde Aromático|M
Scandal pour Homme|Jean Paul Gaultier|100|Ámbar Amaderada|M
Terre d'Hermès|Hermès|100|Amaderada Especiada|M
Tommy|Tommy Hilfiger|100|Cítrica Aromática|M
Happy for Men|Clinique|100|Cítrica Aromática|M
Blue Seduction|Antonio Banderas|100|Ámbar Acuático|M
Lapidus pour Homme|Ted Lapidus|100|Ámbar Fougère|M
Spicebomb|Viktor & Rolf|100|Amaderada Especiada|M
Spicebomb Extreme|Viktor & Rolf|100|Ámbar Especiada|M
Paris Hilton for Men|Paris Hilton|100|Tropical Afrutado|M
Nautica Voyage|Nautica|100|Amaderada Acuática|M
Y Eau de Parfum|Yves Saint Laurent|100|Aromática Fougère|M
Swiss Army|Victorinox|100|Amaderada Aromática|M
Born in Roma Uomo|Valentino|100|Aromática Oriental|M
Born in Roma Green Stravaganza|Valentino|100|Cítrico Fresco Especiado|M
Valentino Uomo|Valentino|100|Amaderado Cuero|M
Messi|Messi|100|Aromático Fougère|M
Pegasus|Parfums de Marly|100|Lavanda Fresco Especiado|M
Layton|Parfums de Marly|100|Afrutado Fresco|M
Kalan|Parfums de Marly|100|Musgo Dulce|M
9 PM|Afnan|100|Ámbar Vainilla|M
9 PM Rebel|Afnan|100|Aromática Fougère|M
9 PM Elixir|Afnan|100|Oriental Especiada|M
9 PM Night Out|Afnan|100|Oriental Especiada|M
9 AM Dive|Afnan|100|Aromática Acuática|M
Hawas for Him|Rasasi|100|Aromática Acuática|M
Mandarin Sky|Armaf|100|Cítrica Oriental|M
Odyssey Homme|Armaf|100|Ámbar Atalcado|M
Odyssey Wild One|Armaf|100|Fresco Amaderado|M
Odyssey Aoud|Armaf|100|Amaderado Cálido Especiado|M
Odyssey Tyrant|Armaf|100|Amaderado Cálido Especiado|M
Odyssey Limoni|Armaf|100|Cítrico Aromático|M
Club de Nuit Intense Man|Armaf|105|Cítrico Amaderado|M
Club de Nuit Lionheart Man|Armaf|100|Avainillado Ámbar|M
Asad Elixir|Lattafa|100|Ámbar Fresco Especiado|M
Asad Zanzibar|Lattafa|100|Avainillado Iris|M
Asad Bourbon|Lattafa|100|Avainillado Ámbar|M
Fakhar Black|Lattafa|100|Aromático Fresco|M
Atlas|Lattafa|55|Aromática Acuática|M
Emeer|Lattafa|100|Cítrico Fresco Especiado|M
Bharara Double Blue|Bharara|100|Cítrico Afrutado|M
Bharara King|Bharara|100|Dulce Avainillado|M
Nitro Red|Dumont|100|Amaderado Ámbar|M
Guetto El Arte del Barrio|Guetto|100|Cítrico Fresco Especiado|U
Club de Nuit Untold|Armaf|105|Afrutado Atalcado|U
Odyssey Spectra|Armaf|100|Avainillado Ámbar|U
Odyssey Marshmallow|Armaf|100|Floral Frutal Gourmand|U
Beach Party|Armaf|100|Aromática Frutal Marina|U
Khamrah Qahwa|Lattafa|100|Cálido Especiado Atalcado|U
Khamrah Dukhan|Lattafa|100|Ámbar Tabaco Ahumado|U
Fakhar Extrait|Lattafa|100|Ámbar Almizclado|U
Bade'e Al Oud Amethyst|Lattafa|100|Ámbar Vainilla|U
Bade'e Al Oud for Glory|Lattafa|100|Ámbar Vainilla|U
Bade'e Al Oud Honor & Glory|Lattafa|100|Ámbar Vainilla|U
Bade'e Al Oud Sublime|Lattafa|100|Ámbar Vainilla|U
Maahir Black|Lattafa|100|Amaderada Oud|U
Maahir Legacy|Lattafa|100|Fresca Especiada|U
Art of Universe|Lattafa|100|Cítrico Almizclado|U
Ajwad|Lattafa|100|Rosas Almizclado|U
Afeef|Lattafa|100|Floral Blanco Afrutado|U
Shaheen Gold|Lattafa|100|Frutal Gourmand|U
Musamam Black Intense|Lattafa|100|Amaderada Aromática|U
Bharara Onyx|Bharara|100|Oriental Amaderada|U
Pharaoh Ramesses II|Bharara|100|Oriental Amaderada|U
Oud Saffron|Orientica|80|Amaderada Especiada|U
Royal Amber|Orientica|80|Ámbar Vainilla|U
Velvet Gold|Orientica|80|Floral|U
Amber Rouge|Orientica|80|Amaderada Especiada|U
Azure Fantasy|Orientica|100|Frutal Oriental|U
Amber Noir|Orientica|100|Amaderado Aromático|U
Noble Premium|Orientica|100|Floral Blanco|U
L'Aventure Blanche|Al Haramain|100|Floral|U
Amber Oud Rouge|Al Haramain|120|Ámbar Floral|U
Aqua Dubai|Al Haramain|120|Cítrico Almizclado|U
Octans|Ahli|60|Amaderada Especiada|U
Vulcan Feu|French Avenue|100|Floral Afrutado|U
Vulcan Baie|French Avenue|100|Floral Frutal|U
You Are My Fire|Zakat|100|Frutal Amaderado|U
Stallion 53|Emper|100|Atalcado Animálico|U
Baccarat Rouge 540|Maison Francis Kurkdjian|70|Ámbar Floral|U
Chocolate Greedy|Montale|100|Ámbar Vainilla|U
Starry Nights|Montale|100|Oriental Floral|U
Pure Gold|Montale|100|Floral Frutal|F
Fruits of the Musk|Montale|100|Floral Frutal|U
Roses Musk|Montale|100|Floral Almizcle|F
Arabians Tonka|Montale|100|Ámbar Amaderado|U
Wood & Spices|Montale|100|Amaderada Especiada|U
Aoud Damascus|Montale|100|Ámbar Floral|U
Intense Café|Montale|100|Ámbar Vainilla|U
Ombre Nomade|Louis Vuitton|100|Ámbar Amaderado|U
Rose des Vents|Louis Vuitton|100|Cítrica Floral|F
L'Immensité|Louis Vuitton|100|Herbal Almizclado|M
City of Stars|Louis Vuitton|100|Floral Blanco Fresco Especiado|U
Les Sables Roses|Louis Vuitton|100|Animálico Balsámico|U
Imagination|Louis Vuitton|100|Cítrico Fresco Ámbar|M
Santal 33|Le Labo|100|Amaderada Aromática|U
Bergamote 22|Le Labo|100|Amaderada Cítrica|U
Bleecker Street|Bond No. 9|100|Ámbar Amaderada|U
Erba Pura|Xerjoff|100|Dulce Ámbar Frutal|U
Naxos|Xerjoff|100|Dulce Lavanda|U
Alexandria II|Xerjoff|100|Amaderado Oud|U
Angels' Share|Kilian|50|Amaderado Atalcado|U`;

// y año · p perfumista · n notas [salida, corazón, fondo] · s historia · f frase · fam/shape/cap/liq visual
const RICH={
'nautica-voyage':{fam:'acuatico',y:2006,n:[['Manzana verde','Hojas verdes'],['Loto','Mimosa'],['Musgo','Cedro','Almizcle','Ámbar']],s:'Nautica nació en Nueva York en 1983 de la mano del diseñador David Chu, inspirada en la vida en el mar. Voyage llegó en 2006 para embotellar esa misma idea: cubierta mojada, sal y viento. Se volvió uno de los acuáticos más queridos por su frescura fácil y honesta.',f:'Me recuerda a una escapada a la playa bajo la luna llena, con la primera mujer que una vez amé.',shape:'round',cap:'silver',liq:'#7bb6d9'},
'lady-million':{y:2010,p:'Anne Flipo, Dominique Ropion y Béatrice Piquet',n:[['Neroli','Frambuesa','Limón de Amalfi'],['Jazmín','Gardenia','Flor de azahar'],['Miel','Pachulí','Ámbar']],s:'Paco Rabanne la creó como respuesta femenina a 1 Million: si él era un lingote de oro, ella sería el diamante. El frasco tallado como una gema resume la idea: brillo, exceso y seguridad sin pedir permiso.',f:'Tacones en la mano a las cuatro de la mañana, y la ciudad entera todavía hablando de ti.',shape:'facet',cap:'gold',liq:'#f0d6a2'},
'1-million':{y:2008,p:'Christophe Raynaud, Olivier Pescheux y Michel Girard',n:[['Toronja','Menta','Mandarina roja'],['Rosa','Canela','Especias'],['Cuero','Ámbar','Maderas']],s:'Su frasco con forma de lingote de oro rompió con todo lo visto en la perfumería masculina. Paco Rabanne quiso embotellar el poder y la ostentación, pero con un guiño de humor.',f:'La noche en que entré al casino con lo último que me quedaba, y salí con la luna en el bolsillo.',shape:'rect',cap:'gold',liq:'#e6b64c'},
'invictus':{fam:'acuatico',y:2013,p:'Anne Flipo, Dominique Ropion, Olivier Polge y Véronique Nyberg',n:[['Toronja','Notas marinas','Mandarina'],['Laurel','Jazmín'],['Ámbar gris','Guayaco','Musgo de roble','Pachulí']],s:'El frasco es un trofeo: Paco Rabanne quiso un perfume para el campeón, el que gana dentro y fuera de la cancha. Frescura marina sobre un fondo amaderado que se siente como piel después de la victoria.',f:'El silencio del vestuario un segundo antes de que el estadio grite tu nombre.',shape:'facet',cap:'silver',liq:'#d9e6ee'},
'good-girl':{y:2016,p:'Louise Turner',n:[['Almendra','Café'],['Nardo','Jazmín sambac'],['Haba tonka','Cacao']],s:'Carolina Herrera quiso retratar la dualidad de la mujer moderna: buena y atrevida a la vez. La convirtió en un frasco con forma de tacón stiletto, uno de los más reconocibles del mundo.',f:'Un vestido negro, una copa sin terminar y la decisión de no volver temprano a casa.',shape:'facet',cap:'gold',liq:'#1c2a4a'},
'n-5':{y:1921,p:'Ernest Beaux',n:[['Aldehídos','Ylang-ylang','Neroli'],['Jazmín','Rosa de mayo','Iris'],['Sándalo','Vetiver','Vainilla']],s:'Gabrielle Chanel pidió a Ernest Beaux un perfume de mujer que oliera a mujer. Entre las muestras que él le presentó, eligió la número cinco, y así quedó su nombre. Fue de los primeros en usar aldehídos de forma protagónica.',f:'Un salón de espejos en París, guantes de seda y un secreto que nunca le contaste a nadie.',shape:'rect',cap:'silver',liq:'#f2dca0'},
'coco':{y:1984,p:'Jacques Polge',n:[['Cilantro','Mandarina','Melocotón'],['Clavo','Rosa','Jazmín'],['Ámbar','Vainilla','Opopónaco']],s:'Inspirado en el apartamento de Gabrielle Chanel en la rue Cambon, lleno de biombos lacados y objetos de Oriente. Un ámbar especiado que huele a terciopelo y a historia.',f:'Una tarde de lluvia leyendo cartas antiguas junto a una lámpara de luz ámbar.',shape:'rect',cap:'black',liq:'#c9773a'},
'chance-eau-tendre':{y:2010,p:'Jacques Polge',n:[['Toronja','Membrillo'],['Jacinto','Jazmín'],['Almizcle blanco','Iris','Ámbar']],s:'La versión más suave de Chance, la línea de Chanel dedicada al azar y a la alegría. Su frasco redondo invita a girarlo como una ruleta de la suerte.',f:'La primera mañana de primavera en que abres la ventana y decides que todo va a salir bien.',shape:'round',cap:'silver',liq:'#f6d6dc'},
'gabrielle':{y:2017,p:'Olivier Polge',n:[['Mandarina','Toronja','Grosella negra'],['Jazmín','Ylang-ylang','Nardo','Flor de azahar'],['Sándalo','Almizcle']],s:'Un homenaje a la mujer detrás del mito: Gabrielle Chanel antes de ser Coco. Un floral blanco luminoso que celebra la determinación.',f:'Despertar en una casa de campo con sábanas blancas y saber que hoy empiezas de cero.',shape:'rect',cap:'gold',liq:'#f3e4c0'},
'light-blue':{y:2001,p:'Olivier Cresp',n:[['Limón siciliano','Manzana','Cedro'],['Bambú','Jazmín','Rosa blanca'],['Cedro','Ámbar','Almizcle']],s:'Dolce & Gabbana embotelló el verano del Mediterráneo: Capri, limones al sol y el mar turquesa. Su campaña con un bote en el agua azul es casi tan famosa como el perfume.',f:'Saltar de un velero al agua tibia de Capri mientras alguien ríe en la cubierta.',shape:'rect',cap:'silver',liq:'#cfe6f5'},
'light-blue-pour-homme':{y:2007,p:'Alberto Morillas',n:[['Toronja','Bergamota','Enebro'],['Pimienta','Romero','Palo de rosa'],['Almizcle','Incienso','Musgo de roble']],s:'La contraparte masculina de Light Blue: la misma luz mediterránea, ahora con hierbas y madera. Fresco, limpio y fácil de llevar todo el día.',f:'Una moto por la costa amalfitana, camisa blanca abierta y ningún plan para la tarde.',shape:'rect',cap:'silver',liq:'#a8cbe6'},
'j-adore':{y:1999,p:'Calice Becker',n:[['Pera','Melón','Bergamota'],['Jazmín','Nardo','Rosa'],['Vainilla','Almizcle','Cedro']],s:'Dior lo lanzó en 1999 como un ramo floral moderno. Su frasco en forma de ánfora, con el cuello de anillos dorados, se inspiró en los collares de las mujeres masái.',f:'Una gala en un jardín de rosas, el vestido dorado rozando la hierba al atardecer.',shape:'round',cap:'gold',liq:'#f1d58a'},
'miss-dior':{y:1947,n:[['Mandarina','Bergamota'],['Rosa de Grasse','Peonía','Lirio de los valles'],['Almizcle','Pachulí']],s:'Christian Dior lo creó en 1947, el año de su revolucionario New Look, y lo nombró en honor a su hermana Catherine. Desde entonces es sinónimo de romance, lazos y alta costura.',f:'Una carta de amor escrita a mano, sellada con un beso y un lazo de seda.',shape:'rect',cap:'silver',liq:'#f3b6c4'},
'black-opium-floral-shock':{y:2014,p:'Nathalie Lorson, Marie Salamagne, Olivier Cresp y Honorine Blanc',n:[['Pera','Pimienta rosa','Flor de azahar'],['Café','Jazmín'],['Vainilla','Pachulí','Cedro']],s:'Yves Saint Laurent reinventó su legendario Opium para una generación nocturna: café negro y vainilla en un frasco con destellos que parece una noche de fiesta. Floral Shock es su versión más floral y luminosa.',f:'La pista de baile a medianoche, luces de neón en la piel y un café cargado para no irte nunca.',shape:'cyl',cap:'black',liq:'#e86aa0'},
'scandal':{y:2017,p:'Daphné Bugey y Christophe Raynaud',n:[['Mandarina','Naranja sanguina'],['Miel','Gardenia','Jazmín'],['Cera de abejas','Pachulí','Caramelo']],s:'Jean Paul Gaultier imaginó a una mujer impecable de día y escandalosa de noche. El frasco son unas piernas cabeza abajo: un guiño divertido y provocador.',f:'La gala más elegante del año, y tú escapándote por la cocina con el mesero más guapo.',shape:'facet',cap:'gold',liq:'#f0b35a'},
'la-vie-est-belle':{y:2012,p:'Olivier Polge, Dominique Ropion y Anne Flipo',n:[['Grosella negra','Pera'],['Iris','Jazmín','Flor de azahar'],['Praliné','Vainilla','Pachulí']],s:'Lancôme quiso embotellar la felicidad. Su frasco con forma de sonrisa de cristal y el iris dulce de su corazón lo convirtieron en uno de los perfumes más vendidos del mundo.',f:'Una terraza en París, un postre compartido y la certeza de que la vida, al final, sí es bella.',shape:'facet',cap:'black',liq:'#f0b8c6'},
'cloud':{fam:'dulce',y:2018,n:[['Lavanda','Pera','Bergamota'],['Crema batida','Praliné','Coco'],['Almizcle','Maderas cremosas']],s:'Ariana Grande lo imaginó como su lugar feliz: suave, soñador y optimista. Su frasco en forma de nube con un pompón se volvió objeto de colección.',f:'Un domingo sin alarma, envuelta en una cobija y viendo el cielo rosa desde la ventana.',shape:'round',cap:'silver',liq:'#d9d6f0'},
'bombshell':{y:2010,n:[['Maracuyá','Toronja','Piña'],['Peonía','Orquídea'],['Almizcle','Maderas']],s:'Victoria\'s Secret lo creó como el aroma insignia de sus ángeles: glamoroso, frutal y luminoso. Se convirtió en el perfume más famoso de la marca.',f:'Una sesión de fotos en Miami, viento en el pelo y todo el mundo preguntando quién eres.',shape:'rect',cap:'silver',liq:'#f2a6bd'},
'delina':{y:2017,p:'Quentin Bisch',n:[['Lichi','Ruibarbo','Bergamota'],['Rosa turca','Peonía'],['Vainilla','Cachemira','Almizcle']],s:'Parfums de Marly se inspira en la corte de Luis XV y su pasión por los caballos. Delina es su gran rosa: frutal, empolvada y romántica, en un frasco rosa con un dije dorado.',f:'Un baile en un palacio francés, y alguien que te mira desde el otro lado del salón sin atreverse aún.',shape:'facet',cap:'gold',liq:'#f4c6d3'},
'burberry-her':{y:2018,p:'Francis Kurkdjian',n:[['Fresa','Frambuesa','Mora','Limón'],['Violeta','Jazmín'],['Almizcle','Ámbar','Musgo']],s:'Burberry lo dedicó a la energía de Londres. Frutos rojos jugosos sobre una base suave y atalcada.',f:'Correr bajo la lluvia por Londres con una bolsa de fresas y la risa sin parar.',shape:'rect',cap:'black',liq:'#f0a7b5'},
'flower-by-kenzo':{y:2000,p:'Alberto Morillas',n:[['Mandarina','Grosella negra','Espino'],['Violeta','Rosa de Bulgaria','Jazmín'],['Vainilla','Almizcle blanco','Incienso']],s:'Kenzo se preguntó cómo olería una flor que no tiene aroma: la amapola. La respuesta fue un floral empolvado y un frasco con una amapola roja inclinada al viento.',f:'Una amapola creciendo entre el cemento de la ciudad, terca y hermosa.',shape:'cyl',cap:'silver',liq:'#f3d2dc'},
'halloween':{y:1997,n:[['Violeta','Limón'],['Nardo','Magnolia'],['Mirra','Sándalo']],s:'Creado por el diseñador español Jesús del Pozo, con un frasco violeta inspirado en la magia y la noche. Floral, misterioso y femenino.',f:'Una noche de luna violeta en la que crees, solo un poco, en los hechizos.',shape:'round',cap:'black',liq:'#7a4fa0'},
'yara':{n:[['Orquídea','Heliotropo','Mandarina'],['Frutas tropicales','Gourmand'],['Vainilla','Almizcle','Sándalo']],s:'Lattafa, casa de perfumería de los Emiratos Árabes, creó Yara como un abrazo dulce y cremoso en un frasco rosa. En pocos años se volvió un fenómeno viral por su calidad y su estela.',f:'Una merienda de batido de fresa con tu mejor amiga, contándose todos los secretos.',shape:'rect',cap:'gold',liq:'#f2b8cc'},
'baccarat-rouge-540':{fam:'oriental',y:2015,p:'Francis Kurkdjian',n:[['Azafrán','Jazmín'],['Ambroxan','Madera de ámbar'],['Resina de abeto','Cedro']],s:'Nació para celebrar los 250 años de la cristalería Baccarat. Francis Kurkdjian lo pensó como cristal convertido en aroma: luminoso, aireado y mineral. Hoy es uno de los perfumes nicho más reconocidos del mundo.',f:'Una copa de cristal brindando bajo una lámpara de araña, el instante exacto antes del sí.',shape:'facet',cap:'gold',liq:'#e88a6a'},
'sauvage':{y:2015,p:'François Demachy',n:[['Bergamota de Calabria','Pimienta'],['Pimienta de Sichuan','Lavanda','Geranio'],['Ambroxan','Cedro','Ládano']],s:'Inspirado en paisajes abiertos bajo un cielo azul ardiente: un desierto al caer el sol. Su campaña lo convirtió en uno de los perfumes masculinos más vendidos del planeta.',f:'Manejar solo por el desierto al caer el sol, con la ventana abajo y nada que demostrarle a nadie.',shape:'rect',cap:'black',liq:'#7fa7c9'},
'sauvage-elixir':{y:2021,p:'François Demachy',n:[['Toronja','Canela','Nuez moscada','Cardamomo'],['Lavanda'],['Regaliz','Sándalo','Ámbar','Pachulí']],s:'La concentración más intensa de Sauvage: especias, lavanda y maderas en un frasco más corto y oscuro.',f:'Una fogata en el desierto a medianoche, el cielo lleno de estrellas y una historia que no se cuenta dos veces.',shape:'rect',cap:'black',liq:'#3a4f7a'},
'bleu-de-chanel':{y:2010,p:'Jacques Polge',n:[['Toronja','Limón','Menta','Pimienta rosa'],['Jengibre','Nuez moscada','Jazmín'],['Incienso','Vetiver','Cedro','Sándalo']],s:'Chanel lo presentó como el perfume del hombre que no sigue las reglas. Su frasco azul profundo y su campaña dirigida por Martin Scorsese marcaron una época.',f:'Salir de una reunión importante, soltar la corbata y caminar por la ciudad sin rumbo.',shape:'rect',cap:'black',liq:'#2b4c7e'},
'acqua-di-gio':{fam:'acuatico',y:1996,p:'Alberto Morillas',n:[['Lima','Limón','Bergamota','Notas marinas'],['Jazmín','Romero'],['Almizcle blanco','Cedro','Pachulí']],s:'Giorgio Armani lo creó inspirado en la isla de Pantelleria, donde pasaba sus veranos. Mar, sal y sol sobre la piel: el aroma acuático por excelencia.',f:'Secarte al sol sobre una roca caliente después de nadar en el mar más azul que has visto.',shape:'rect',cap:'silver',liq:'#d9eef0'},
'acqua-di-gio-profumo':{fam:'acuatico',y:2015,p:'Alberto Morillas',n:[['Bergamota','Notas marinas'],['Romero','Salvia','Geranio'],['Incienso','Pachulí']],s:'Una versión más profunda de Acqua di Giò: la roca volcánica oscura que se encuentra con el mar. El incienso le da un fondo elegante, casi nocturno.',f:'Una cena junto al mar en una isla volcánica, la brisa salada mezclada con humo de velas.',shape:'rect',cap:'black',liq:'#3c4a52'},
'aventus':{fam:'frutal',y:2010,p:'Olivier Creed y Erwin Creed',n:[['Piña','Bergamota','Grosella negra','Manzana'],['Abedul','Pachulí','Jazmín'],['Almizcle','Musgo de roble','Ámbar gris','Vainilla']],s:'La casa Creed lo dedicó a Napoleón: guerra, paz y romance. Su piña ahumada lo convirtió en leyenda y en uno de los perfumes nicho más imitados de la historia.',f:'Firmar el trato de tu vida y celebrarlo solo, en silencio, mirando la ciudad desde arriba.',shape:'cyl',cap:'silver',liq:'#eeece4'},
'silver-mountain-water':{y:1995,p:'Olivier Creed',n:[['Bergamota','Mandarina'],['Té verde','Grosella negra'],['Almizcle','Sándalo','Gálbano']],s:'Inspirado en los Alpes suizos y en los arroyos que bajan de sus cumbres nevadas, el lugar de esquí favorito de Olivier Creed.',f:'Respirar el aire helado de la montaña después de esquiar, con las mejillas rojas y el corazón tranquilo.',shape:'cyl',cap:'silver',liq:'#e4eef2'},
'green-irish-tweed':{fam:'aromatico',y:1985,p:'Olivier Creed',n:[['Verbena','Hierba'],['Violeta','Hojas de violeta'],['Ámbar gris','Sándalo']],s:'Un verde clásico que evoca los campos irlandeses después de la lluvia. Fue el favorito de varias estrellas de Hollywood.',f:'Caminar por un campo de Irlanda después de la lluvia, con un abrigo de lana y el perro corriendo adelante.',shape:'cyl',cap:'silver',liq:'#a9c79a'},
'eros':{y:2012,p:'Aurélien Guichard',n:[['Menta','Manzana verde','Limón'],['Haba tonka','Ambroxan','Geranio'],['Vainilla','Vetiver','Cedro']],s:'Versace lo bautizó con el nombre del dios griego del amor. Su frasco turquesa con la cabeza de Medusa es pura mitología mediterránea.',f:'Una fiesta en la playa de Mykonos, la música alta y alguien que te sigue con la mirada.',shape:'rect',cap:'gold',liq:'#2fb0a8'},
'eros-flame':{y:2018,n:[['Naranja sanguina','Pimienta negra','Limón'],['Rosa','Pimienta'],['Vainilla','Haba tonka','Sándalo']],s:'La versión apasionada de Eros: cítricos rojos y especias sobre una base cálida, en un frasco rojo fuego.',f:'Bailar salsa con una desconocida hasta que el amanecer los obliga a despedirse.',shape:'rect',cap:'gold',liq:'#c0392b'},
'le-male':{y:1995,p:'Francis Kurkdjian',n:[['Lavanda','Menta','Cardamomo'],['Canela','Flor de azahar','Comino'],['Vainilla','Haba tonka','Sándalo']],s:'Jean Paul Gaultier lo lanzó en un frasco con forma de torso de marinero con camiseta a rayas, guardado en una lata metálica. Francis Kurkdjian lo creó con apenas 25 años.',f:'Un marinero en un puerto de Marsella, recién afeitado, con lavanda en la piel y ganas de tierra firme.',shape:'cyl',cap:'silver',liq:'#9cc7e8'},
'le-male-elixir':{fam:'dulce',y:2023,n:[['Lavanda','Menta'],['Vainilla','Benjuí'],['Haba tonka','Miel','Tabaco']],s:'La versión más intensa del marinero de Gaultier: ámbar, miel y tabaco que se quedan en la piel por horas.',f:'El último trago en un bar del puerto, la camisa abierta y el mar oscuro afuera.',shape:'cyl',cap:'gold',liq:'#d9a441'},
'ultra-male':{y:2015,n:[['Pera','Lavanda','Menta','Bergamota'],['Canela','Salvia'],['Vainilla negra','Ámbar','Pachulí']],s:'Una versión más dulce y nocturna de Le Male, con pera jugosa y vainilla negra.',f:'Una fiesta de disfraces que se te salió de las manos, y que no cambiarías por nada.',shape:'cyl',cap:'black',liq:'#3c5a8a'},
'spicebomb':{y:2012,p:'Olivier Polge',n:[['Bergamota','Pimienta rosa','Elemí'],['Canela','Azafrán','Pimentón'],['Tabaco','Cuero','Vetiver']],s:'Viktor & Rolf lo encerró en un frasco con forma de granada de mano: una explosión de especias, controlada pero peligrosa.',f:'Un mercado de especias en Marrakech al anochecer, y tú perdiéndote a propósito entre los puestos.',shape:'round',cap:'black',liq:'#9a2a1d'},
'terre-d-hermes':{y:2006,p:'Jean-Claude Ellena',n:[['Naranja','Toronja'],['Pimienta','Pelargonio','Pedernal'],['Vetiver','Cedro','Pachulí','Benjuí']],s:'Jean-Claude Ellena lo pensó como una metáfora de la tierra: un aroma vertical que va de la raíz al cielo. Mineral, amaderado y sereno.',f:'Las manos en la tierra de un huerto propio, después de haber dejado la ciudad para siempre.',shape:'rect',cap:'black',liq:'#e2b07a'},
'fahrenheit':{y:1988,p:'Jean-Louis Sieuzac y Michel Almairac',n:[['Hoja de violeta','Bergamota','Nuez moscada'],['Cuero','Clavel','Madreselva'],['Vetiver','Cedro','Almizcle']],s:'Su frasco en degradado del rojo al negro evoca un atardecer ardiente. Con su hoja de violeta y su cuero rompió moldes, y sigue siendo inconfundible.',f:'Una gasolinera solitaria en la carretera al atardecer, el olor a asfalto caliente y a libertad.',shape:'cyl',cap:'black',liq:'#b24a2a'},
'stronger-with-you':{fam:'dulce',y:2017,n:[['Cardamomo','Pimienta rosa','Violeta'],['Salvia','Melón'],['Castaña','Vainilla','Haba tonka']],s:'Emporio Armani lo pensó para parejas jóvenes que se hacen más fuertes juntas. Su castaña acaramelada lo hace cálido y adictivo.',f:'Compartir castañas asadas en un mercado navideño, con tu mano en el bolsillo de su abrigo.',shape:'rect',cap:'black',liq:'#8a3a3a'},
'the-one-for-men':{y:2008,n:[['Toronja','Cilantro','Albahaca'],['Cardamomo','Jengibre','Flor de azahar'],['Ámbar','Tabaco','Cedro']],s:'Dolce & Gabbana lo creó para el hombre elegante y seguro, con aire de película italiana clásica. Tabaco y ámbar en un frasco con tapa dorada.',f:'Un bar de hotel en Roma, traje oscuro, un whisky en la mano y la historia de amor que está por empezar.',shape:'rect',cap:'gold',liq:'#c88d4a'},
'polo-blue':{fam:'acuatico',y:2003,n:[['Melón','Pepino','Mandarina'],['Albahaca','Salvia','Geranio'],['Gamuza','Almizcle','Maderas']],s:'Ralph Lauren lo inspiró en el cielo abierto y el agua: una lectura fresca y acuática de su universo Polo.',f:'Una mañana de regata, el cielo inmenso y la espuma salpicando la cubierta.',shape:'round',cap:'silver',liq:'#3f6fb5'},
'boss-bottled':{y:1998,p:'Annick Ménardo',n:[['Manzana','Ciruela','Bergamota'],['Canela','Clavo','Geranio'],['Sándalo','Vetiver','Cedro']],s:'El aroma emblemático de Hugo Boss, pensado para el hombre que se arma de confianza cada mañana. La manzana y la canela lo hacen cálido y cercano.',f:'Abrocharte la camisa frente al espejo el día de tu primer gran trabajo.',shape:'rect',cap:'silver',liq:'#d8c9a0'},
'l-eau-d-issey-pour-homme':{y:1994,p:'Jacques Cavallier',n:[['Yuzu','Limón','Bergamota'],['Nuez moscada','Loto','Canela'],['Vetiver','Sándalo','Tabaco']],s:'Issey Miyake buscó la pureza del agua: un frasco cónico minimalista y el yuzu japonés como protagonista.',f:'Una lluvia de verano en Tokio, y el olor del asfalto mojado mezclado con cítricos.',shape:'cyl',cap:'silver',liq:'#e6efe9'},
'khamrah-qahwa':{y:2023,n:[['Canela','Cardamomo','Jengibre'],['Praliné','Flores blancas'],['Café','Vainilla','Haba tonka','Benjuí']],s:'Khamrah, de Lattafa, se volvió fenómeno mundial por su mezcla de dátiles y especias. Qahwa es su versión con café árabe: cálido, aromático y hospitalario.',f:'Una tienda en el desierto donde te sirven café con cardamomo y te piden que te quedes otra noche.',shape:'rect',cap:'gold',liq:'#7a4a2a'},
'club-de-nuit-intense-man':{fam:'amaderado',y:2015,n:[['Limón','Piña','Grosella negra','Manzana'],['Abedul','Jazmín','Rosa'],['Almizcle','Ámbar gris','Pachulí','Vainilla']],s:'Armaf, casa de los Emiratos, lanzó esta fragancia ahumada y frutal que conquistó a los amantes del perfume por su proyección y su gran relación calidad-precio.',f:'Entrar a una fiesta privada en Dubái, saludar a todos y saber que esa noche es tuya.',shape:'cyl',cap:'black',liq:'#2a2a2a'},
'santal-33':{y:2011,p:'Frank Voelkl',n:[['Cardamomo','Violeta'],['Iris','Papiro'],['Sándalo','Cedro','Cuero','Ámbar']],s:'Le Labo, fundada en Nueva York, lo pensó como un homenaje al Oeste americano: fogatas, cuero y sándalo. Se convirtió en el aroma de culto de toda una ciudad.',f:'Una cabaña de madera en las montañas, una manta de lana y el fuego crepitando toda la noche.',shape:'cyl',cap:'black',liq:'#e8d8bf'},
'angels-share':{fam:'dulce',y:2020,p:'Benoist Lapouza',n:[['Coñac'],['Canela','Haba tonka','Roble'],['Praliné','Vainilla','Sándalo']],s:'En las bodegas de coñac, la parte que se evapora de los barriles se llama "la parte de los ángeles". Kilian embotelló ese momento: licor, canela y madera dulce.',f:'Una biblioteca antigua en invierno, una copa de coñac y una conversación que dura hasta el amanecer.',shape:'round',cap:'gold',liq:'#c06a2b'},
'ombre-nomade':{y:2018,p:'Jacques Cavallier Belletrud',n:[['Frambuesa','Incienso'],['Rosa','Geranio'],['Oud','Benjuí','Ámbar']],s:'Louis Vuitton se inspiró en las arenas del desierto y en la figura del viajero nómada. Su oud profundo lo vuelve uno de los perfumes más lujosos de la casa.',f:'Cruzar el desierto en caravana bajo una tormenta de arena dorada, buscando un oasis que nadie ha visto.',shape:'rect',cap:'black',liq:'#8a3b2c'},
'imagination':{y:2021,p:'Jacques Cavallier Belletrud',n:[['Cidra','Bergamota','Naranja'],['Jengibre','Canela','Neroli'],['Té negro','Ámbar','Guayaco']],s:'Una invitación a viajar con la mente: cítricos brillantes y té negro, el ritual del té convertido en perfume.',f:'Leer un mapa antiguo con una taza de té negro, imaginando el viaje que harás algún día.',shape:'rect',cap:'black',liq:'#e9d9a6'},
'naxos':{y:2015,p:'Chris Maurice',n:[['Lavanda','Bergamota','Limón'],['Miel','Canela','Jazmín'],['Tabaco','Haba tonka','Vainilla']],s:'Xerjoff lo dedicó a Sicilia y a su herencia mediterránea. Miel y tabaco envueltos en lavanda: un clásico moderno del perfume nicho.',f:'Una terraza en Sicilia, miel en el pan, un cigarro apagado y el volcán humeando a lo lejos.',shape:'facet',cap:'gold',liq:'#d9a441'},
'erba-pura':{fam:'frutal',y:2019,n:[['Naranja siciliana','Limón','Bergamota'],['Frutas'],['Almizcle blanco','Vainilla','Ámbar']],s:'Xerjoff creó un frutal luminoso y adictivo, con una estela que se reconoce a metros. Un estallido de fruta mediterránea sobre almizcle cremoso.',f:'Un mercado de frutas en la Riviera italiana, el sol en la cara y una canasta llena de duraznos.',shape:'facet',cap:'gold',liq:'#f2c46a'},
'layton':{y:2016,p:'Hamid Merati-Kashani',n:[['Manzana','Lavanda','Bergamota'],['Geranio','Violeta','Jazmín'],['Vainilla','Cardamomo','Pimienta','Pachulí']],s:'Parfums de Marly lo nombró por los palacios y los caballos de Luis XV. Manzana, lavanda y vainilla en una combinación elegante y versátil.',f:'Un paseo a caballo por los jardines de un palacio en otoño, y una cena privada esperándote al final.',shape:'facet',cap:'silver',liq:'#4a3a5a'},
'pegasus':{y:2011,p:'Hamid Merati-Kashani',n:[['Bergamota','Heliotropo'],['Lavanda','Almendra amarga','Jazmín'],['Vainilla','Sándalo','Ámbar']],s:'Inspirado en el caballo alado de la mitología: almendra y vainilla con alas de lavanda.',f:'Volar sobre las nubes en un sueño en el que, por fin, nadie te alcanza.',shape:'facet',cap:'silver',liq:'#d9c6e6'},
'born-in-roma-uomo':{y:2019,n:[['Sal mineral','Jengibre'],['Salvia'],['Vetiver','Maderas ahumadas','Vainilla']],s:'Valentino celebró la Roma contemporánea, rebelde y elegante. Su frasco con tachuelas le da un aire de alta costura callejera.',f:'Una Vespa por las calles de Roma de madrugada, y el Coliseo iluminado solo para ti.',shape:'rect',cap:'black',liq:'#2a2a2e'},
'9-pm':{y:2020,n:[['Manzana','Canela','Lavanda'],['Flor de azahar','Lirio de los valles'],['Vainilla','Haba tonka','Ámbar','Pachulí']],s:'Afnan, casa de Dubái, lo pensó para la noche: dulce, cálido y con gran estela. Uno de los árabes más pedidos por su carácter seductor.',f:'Las nueve de la noche, perfume en el cuello y el carro esperando afuera.',shape:'rect',cap:'gold',liq:'#3a2418'},
'hawas-for-him':{fam:'acuatico',y:2015,n:[['Manzana','Bergamota','Limón','Canela'],['Cardamomo','Ciruela','Flor de azahar'],['Ámbar gris','Almizcle','Pachulí']],s:'Rasasi, de Dubái, creó un acuático dulce y potente que se convirtió en favorito para el clima cálido.',f:'Una noche de verano en un yate frente a Dubái, las luces de la ciudad reflejadas en el agua.',shape:'rect',cap:'silver',liq:'#5aa9c9'},
'212-vip-men':{y:2011,n:[['Lima','Pimienta','Jengibre'],['Vodka','Gin','Menta'],['Cuero','Ámbar','Maderas']],s:'Carolina Herrera embotelló la noche VIP de Nueva York: el frasco recuerda una petaca, y sus notas de vodka y menta huelen a fiesta exclusiva.',f:'La puerta del club se abre sin hacer fila, y adentro suena tu canción.',shape:'rect',cap:'silver',liq:'#d8dee4'},
'212-vip-rose':{y:2011,n:[['Champaña rosada','Pimienta rosa'],['Flor de melocotón'],['Almizcle','Maderas']],s:'La versión femenina de la noche VIP, inspirada en una copa de champaña rosada.',f:'El corcho de champaña saltando a medianoche en una azotea de Nueva York.',shape:'rect',cap:'silver',liq:'#f6b8c6'},
'olympea':{y:2015,n:[['Mandarina verde','Jazmín de agua','Flor de jengibre'],['Vainilla salada'],['Ámbar gris','Cachemira','Sándalo']],s:'Paco Rabanne imaginó a una diosa moderna del Olimpo. Su vainilla salada fue una novedad: dulce y piel al mismo tiempo.',f:'Salir del mar como una diosa griega, con la sal todavía brillando en los hombros.',shape:'facet',cap:'gold',liq:'#f0e2c4'},
'tommy-girl':{y:1996,n:[['Manzana','Grosella negra','Mandarina'],['Camelia','Madreselva','Rosa'],['Sándalo','Cedro']],s:'Tommy Hilfiger lo creó como un aroma alegre y americano, inspirado en el espíritu libre de la juventud de los noventa.',f:'Un viaje por carretera con amigas, ventanas abiertas y la radio cantando a todo volumen.',shape:'rect',cap:'silver',liq:'#f0c2a6'},
'bright-crystal':{y:2006,n:[['Granada','Yuzu'],['Peonía','Magnolia','Loto'],['Almizcle','Ámbar','Caoba']],s:'Versace lo concibió como un floral luminoso y fresco, en un frasco facetado como una joya rosada.',f:'Un brindis en la terraza de un hotel en la costa, el sol reflejándose en los cristales.',shape:'facet',cap:'silver',liq:'#f6c6d0'},
'fantasy':{y:2005,n:[['Kiwi','Lichi','Membrillo'],['Cupcake','Chocolate blanco','Jazmín'],['Almizcle','Iris','Maderas']],s:'El primer perfume de Britney Spears, en un frasco rosa con piedras como una joya mágica. Dulce, divertido y adictivo.',f:'Una pijamada en los 2000, brillo labial de fresa y la canción favorita en repetición.',shape:'round',cap:'gold',liq:'#e88ab0'},
'can-can':{y:2007,n:[['Nectarina','Clementina','Grosella negra'],['Flor de azahar','Orquídea'],['Ámbar','Almizcle','Maderas']],s:'Paris Hilton se inspiró en la energía del cabaret parisino, con un frasco curvo y juguetón.',f:'Un show de cabaret en París, plumas, risas y una noche sin final.',shape:'round',cap:'gold',liq:'#f2a0b0'}
};

const POPULAR=[['sauvage','ml','up'],['yara','l','up'],['baccarat-rouge-540','m','flat'],['good-girl','ml','flat'],['khamrah-qahwa','ml','new'],['bleu-de-chanel','m','flat'],['club-de-nuit-intense-man','l','up'],['la-vie-est-belle','m','flat'],['9-pm','l','up'],['erba-pura','m','new'],['aventus','m','flat'],['invictus','l','flat'],['le-male-elixir','m','up'],['delina','m','flat'],['nautica-voyage','l','up'],['1-million','l','flat'],['cloud','l','flat'],['stronger-with-you','m','up'],['angels-share','m','new'],['light-blue','ml','flat']];

const ICONS=[[/hoja|hierba|^t[eé] |t[eé] verde|t[eé] negro|menta|albahaca|salvia|romero|laurel|verbena|cilantro|bamb[uú]|g[aá]lbano|papiro|enebro/i,'Leaf'],[/lavanda/i,'Sprout'],[/marin|acu[aá]tic|calone|sal mineral|ozon/i,'Waves'],[/lim[oó]n|bergamota|toronja|mandarina|naranja|yuzu|lima|cidra|clementina|neroli|c[ií]tric/i,'Citrus'],[/frambuesa|cereza|fresa|mora|frutos rojos|grosella|lichi|granada|ruibarbo/i,'Cherry'],[/manzana|pera|membrillo|durazno|melocot|nectarina/i,'Apple'],[/uva|ciruela/i,'Grape'],[/pi[nñ]a|maracuy|tropical|mel[oó]n|pepino|kiwi|coco|frutas/i,'TreePalm'],[/caf[eé]|cacao|chocolate/i,'Coffee'],[/coñac|vodka|gin|champa/i,'Wine'],[/miel|cera/i,'Droplet'],[/vainilla|tonka|benju[ií]|almendra|casta[nñ]a|regaliz/i,'Bean'],[/pralin|caramelo|crema|cupcake|gourmand/i,'Candy'],[/rosa|peon|jazm|nardo|gardenia|azahar|ylang|flor|magnolia|lirio|orqu|loto|mimosa|camelia|jacinto|heliotropo|madreselva|clavel|violeta|iris|geranio|pelargonio|espino/i,'Flower2'],[/cuero|gamuza/i,'Briefcase'],[/tabaco|incienso|mirra|opop|l[aá]dano|ahumad|elem[ií]|resina/i,'Flame'],[/canela|pimienta|clavo|nuez|cardamomo|azafr[aá]n|jengibre|comino|piment[oó]n|especia/i,'Sparkles'],[/cedro|s[aá]ndalo|vetiver|pachul|madera|guayaco|roble|abedul|oud|caoba|abeto|musgo|palo/i,'Trees'],[/[aá]mbar|almizcle|ambroxan|aldeh|pedernal|cachemira|maderas cremosas/i,'Gem']];
const noteIcon=n=>{for(const [re,ic] of ICONS) if(re.test(n)) return ic; return 'Sparkles';};

const seen={};
const items=LINES.trim().split('\n').map(l=>{
 const [name,brand,ml,raw,g]=l.split('|');
 let id=slug(name); if(seen[id]) id=id+'-'+slug(brand); seen[id]=1;
 const R=Object.assign({},RICH[id]||{},(window.LC_STORIES||{})[id]||{}); const h=hash(id);
 const fams=famsOf(raw); const fam=R.fam||fams[0]; if(!fams.includes(fam)) fams.unshift(fam);
 const F=FAM[fam];
 const col=NICHO.includes(brand)?'nicho':ARABE.includes(brand)?'arabe':'disenador';
 const notes=R.n||F.notes;
 return {id,name,brand,ml:+ml,raw,g,col,fam,fams,famLabel:F.label,rich:!!R.s,
  shape:R.shape||['rect','round','cyl','facet'][h%4],cap:R.cap||['gold','gold','black','silver'][(h>>4)%4],liq:R.liq||F.liqs[(h>>8)%3],
  notes:notes.map(t=>t.map(n=>({n,icon:noteIcon(n)}))),genericNotes:!R.n,
  phrase:R.f||F.phrases[(h>>12)%F.phrases.length],story:R.s||null,year:R.y||null,perfumer:R.p||null,
  photo:(window.LC_CAT||[]).includes(id)?'assets/cat/'+id+'.webp':null,bottle:null,withBox:(window.LC_WITHBOX||[]).includes(id),more:(R.x||R.c||R.r)?{x:R.x||[],c:R.c||[],r:R.r||[]}:null,
  search:(name+' '+brand+' '+raw+' '+notes.flat().join(' ')).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()};
});
const byId={};items.forEach(i=>byId[i.id]=i);
window.LC_DATA={items,byId,FAM,ORDER,noteIcon,slug,popular:POPULAR.filter(p=>byId[p[0]]).map(([id,src,trend],i)=>({id,src,trend,rank:i+1}))};
})();
