var slides = {};
var classification = null;
// set up experiment logic for each slide
function make_slides(f) {

  // set up initial slide
  slides.i0 = slide({
    name: "i0",
    start: function() {
      exp.startT = Date.now();
    }
  });
  
  slides.legal = slide({
    name: "legal",
    start: function() {
      // hide error message
      $('.err').hide();
    }
  });
  
  // set up the first example slide
  slides.instructions = slide({
    name: "instructions",

    // this is executed when the slide is shown
    start: function() {
      // hide error message
      $('.err').hide();
    }
  });

slides.example = slide({
  name: "example",
  start: function() {
    // hide error message and buttons
    $('.err').hide();
    document.getElementById("example_buttons").style.display = "none";
    document.getElementById("example_answer").value = "";

  },
  button: function() {
    var classification = null;
    if (document.getElementById("example_answer").value === "" & document.getElementById("text_answer").value === "") {
      alert("Textbox must be filled!");
      event.preventDefault();
    } else {
      this.input = document.getElementById("example_answer");
      if (classification === null) {
        alert("Please select a button!");
      } else {
        exp.trials.push({
          "stim" : this.stim,
          "text" : this.input,
          "classification" : classification
        });
        exp.go();
      }
    }
   } 
});
  
slides.almost = slide({
  name: "almost",
  //reseting so we can test for emptiness
  start: function() {
    document.getElementById("example_answer").value = "";
  }

});

  slides.trial = slide({
    name: "trial",
    // To rotate through stimulus list:
    present: exp.stims,
    present_handle : function(stim) {
      $(".err").hide();
      //reseting textbox
      document.getElementById("text_answer").value = "";
      this.stim = stim; // store this information in the slide to record
      $("#stimulus-sentence").html(stim.sentence);
    },    
    start: function() {
        // store stimulus data
        document.getElementById('buttons').style.display = "none";
    },
   button: function() {
      if (document.getElementById("example_answer").value === "" & document.getElementById("text_answer").value === "") {
      alert("Textbox must be filled!");
      event.preventDefault();
    }
    else {
      this.input = document.getElementById("text_answer").value = "";
      check_buttons(classification);
      if (classification != null) {
        exp.trials.push({
          "stim" : this.stim,
          "text" : this.input,
          "classification" : classification,
        });
        exp.go();
      } else {
        alert("Please select a freedom and press \"continue\" again!");
      }
    }
  }
    
    
  });

  //
  slides.thanks = slide({
    name: "thanks",
    start: function() {
      exp.data = {
        "trials": exp.trials,
        "system": exp.system,
        "time_in_minutes": (Date.now() - exp.startT) / 60000
      };
      proliferate.submit(exp.data);
    }
  });

  return slides;
}

function set_classification(value) {
  classification = value;
}

//forces a text input on each slide
function next() {
  if (document.getElementById("example_answer").value === "" & document.getElementById("text_answer").value === "") {
      alert("Textbox must be filled!");
      event.preventDefault();
    }
  else {
    exp.trials.push({
      "stim" : this.stim,
      "text" : document.getElementById("text_answer").value,
      "classification" : this.classification,
    });
    exp.go();
  }
}

//shows buttons when a user is done with the text input
function show_buttons() {
    var x = document.getElementById('example_buttons');
    if (x != null) {
      x.style.display = "block";
    }

    var y = document.getElementById("buttons");
    if (y != null) {
      y.style.display = "block";
    }
}


/// initialize experiment
function init() {

  exp.trials = [];

  var stimuli = [
  {num: 0, type: "non-legal", sentence: 'They think I do great work. It\'s things like the parody video that turns me off to photography as a business. I have no interest in dealing with prospects and clients, answering to their whims, or compromising my freedom…'},
  {num: 1, type: "non-legal", sentence: 'She addressed the Wikosans, using only those words of her language that she knew Benton could understand. "Choose twelve among you to return to Wikosa. You will tell Wikosa that they may buy your lives and your freedom…'},
  {num: 2, type: "legal", sentence: 'Gov Corbett is moving money away from public schools into an expansion of charter schools and vouchers. Even though the budgets of our school districts have been cut they are required to fund charter schools within the district. "These institutions give educators the freedom…'},
  {num: 3, type: "non-legal", sentence: 'What is the very best way to get the Amazon system to work for you when you\'re promoting its products? Offering your buyers a wide selection of products to choose from offers them lots of freedom…'},
  {num: 4, type: "non-legal", sentence: 'It was our Japanese publisher, Sunsoft, who approached us out of the blue asking us if we\'d do a game for an older audience. We shared a tremendous amount of mutual respect toward one another and we were given total creative freedom…'},
  {num: 5, type: "legal", sentence: 'They work under the premise that safer always is better. A current and continuing case, for instance, involves compulsory helmet laws and motorcyclists\' campaign for repeal. Arguments for repeal are basic: freedom…'},
  {num: 6, type: "legal", sentence: 'At the time of the Paris Peace Conference, the goal of the conference was described as "giving birth to a new order to which all mankind is looking for freedom…'},
  {num: 7, type: "legal", sentence: 'No, substantively, nothing has changed. It might be comforting to dig for the positives but the fact remains that this ruling will keep Obama in the WH. There will be nothing left of freedom…'},
  {num: 8, type: "non-legal", sentence: 'One final commonality, though, is less heartening: many organizations appear scared to death of Enterprise 2.0. They\'re worried that people will use the new tools and accompanying freedom…'},
  {num: 9, type: "legal", sentence: 'Our constitution grants to each citizen the liberty and freedom to determine their own perception of reality. We simply ask each American citizen to exercise their freedom…'},
  {num: 10, type: "non-legal", sentence: 'We allowed Percival to modify the starting conditions of this system to see if that would allow us to get to the current situation. At least, that was what we intended. It turns out that we gave Percival the additional freedom… '},
  {num: 11, type: "non-legal", sentence: 'She said, "I live in luxury now. I don\'t have to spend time with people I don\'t like. I have complete freedom…'},
  {num: 12, type: "legal", sentence: 'The prominence of these moguls was so well known it inspired a nickname -- the Boligarchs -- for their fast accumulation of wealth and their ties to the government, which reveres Simon Bolivar, the 19th-century aristocrat who won Venezuela\'s freedom…'},
  {num: 13, type: "non-legal", sentence: 'Once I\'m airborne, the kite responds like a parachute, slowing my descent. I glide for a few seconds before landing on a feathery cushion of waist-deep joy. But most liberating is the sheer freedom…'},
  {num: 14, type: "legal", sentence: 'Human freedom is thus distinct from the kind of freedom talked about by animal liberationists. Human freedom is largely our ability to act free of external constraints, but also freedom…'},
  {num: 15, type: "legal", sentence: 'Both the Religious Test Clause and the First Amendment of the Constitution are not guarantees of religious heterogeneity--they are guarantees of a freedom…'},
  {num: 16, type: "legal", sentence: 'Some women and children have been detained for months in South Texas. Many ties to Georgia found in detention centers are directly linked to the predicament. After winning their freedom…'},
  {num: 17, type: "non-legal", sentence: 'Libraries = Intellectual Freedom. Libraries are already one of the leaders in intellectual freedom. We work hard to ensure privacy and freedom…'},
  {num: 18, type: "legal", sentence: 'One might argue that anyone prepared to be part of a mob is not a classic, individual-liberty conservative. After all, the American revolution was not, unlike the French, a blood-bath for equality, but a war for freedom…'},
  {num: 19, type: "non-legal", sentence: 'Discovery was also the first Star Trek to be rated TV-MA, which gave the showrunners the freedom…'},
  {num: 20, type: "non-legal", sentence: 'I am thrilled to see Occupy working so constructively to help all those who think they are trapped in debt realize that the trap is to a large extent, comprised simply of intimidation, and that with some of the right kind of guidance and thought, one can get free. Life\'s problems and our society\'s problems must still be faced, but once one has attained freedom…'},
  {num: 21, type: "non-legal", sentence: 'Then Peter Gorman offered the winners the chance to work at one of the worst schools in the district. In exchange, the principals would get a raise, freedom…'},
  {num: 22, type: "non-legal", sentence: 'The trip begins in silence as the huge ship departs the Earth transport ship that brought you this far. In comfort you watch as the airship tilts up relative to the planet\'s surface. You start to feel some freedom…'},
  {num: 23, type: "non-legal", sentence: 'I turn to see Grandmother, wiping her eyes and lighting a candle at her shrine. She makes the Sign of the Cross, then tells me a story about the rich man who had everything he wanted except freedom…'},
  {num: 24, type: "non-legal", sentence: 'You\'ve lied to me, held me captive, and separated me from the people I love most in the world. But worst of all, you\'ve used your piety as an excuse to take away my freedom…'},
  {num: 25, type: "non-legal", sentence: 'Subjective performance is conceptualized as a combination of both the athletes\' perception of their own performance and the athletes\' perception of the coaches\' perception of the athletes\' performance level. Subjective performance correlated best with adversity, concentration, confidence, and freedom…'},
  {num: 26, type: "legal", sentence: 'Knowing constitutional law requires full knowledge of all four Organic Laws of the United States of America and the only way to acquire that knowledge is to read and study those laws. Together, the Declaration of Independence and the Articles of Confederation provide a path to freedom…'},
  {num: 27, type: "non-legal", sentence: 'And, son, that\'s why you don\'t want to end up like Stan Smith, the White Castle employee who did everything right.\' Cause what did it get him? A government job fighting for so-called freedom'},
  {num: 28, type: "legal", sentence: 'Ten years ago, 106 nations affirmed their dedication to respecting and upholding core democratic values including the right of citizens to choose their representatives through regular, free, and fair elections with universal and equal suffrage; to equal protection under the law; and to freedom…'},
  {num: 29, type: "legal", sentence: 'What happened to those beautiful statutes enunciated in the constitution which guarantee the sanctity of the citizen\'s life, property, and the many other rights such as the right to freedom…'},
  {num: 30, type: "non-legal", sentence: 'Unlimited means unlimited. I don\'t care if I only use 2GB of data half the year. It\'s the freedom…'},
  {num: 31, type: "non-legal", sentence: 'When people are allowed to choose and do whatever they want, they end up making bad choices that close off the possibility of other future free choices. So the solution is to maximize their overall freedom by limiting freedom…'},
  {num: 32, type: "non-legal", sentence: 'They, more than anyone, understand that what they protect is not a dead soldier, but a symbol of the value we place on those who gave their lives to defend the country they love, its way of life and the freedom…'},
  {num: 33, type: "non-legal", sentence: 'The story of slavery and freedom told so movingly inside the museum, however, is also a painful and shameful narrative heard beyond the building\'s grounds. Visitors don\'t have to enter the building to learn about slavery or see symbols of the Black struggle to defend freedom…'},
  {num: 34, type: "non-legal", sentence: 'It has built 2,000 acres of new islands from sand and coral in the South China Sea, replete with bases and runways. In May, the United States started sending Navy warships to within 12 nautical miles of the islands to assert freedom…'},
  {num: 35, type: "non-legal", sentence: '\“It brought a lot of threats from people already saying I\'ll never work again,\" she told the newspaper. "If that\'s what America has come to, where we all hate and bully people, there\'s no more freedom…'},
  {num: 36, type: "non-legal", sentence: 'It was then, at fifteen, when Megan and I met our first humans. Until that point the technicians kept us in atelier tanks -- alive and conscious, fed information and nutrients through a series of cables and tubes. The tanks gave us freedom…'},
  {num: 37, type: "legal", sentence: 'The American promise is alive. It is that promise that\'s always set this country apart. It\'s a promise that says each of us has the freedom…'},
  {num: 38, type: "non-legal", sentence: 'But as your relationship subtly intensified, she choose the practicality and constraint of her and him over the irrationality and freedom…'},
  {num: 39, type: "non-legal", sentence: 'It is an open question which form of the couplet demands the more technique, heroic or romance. All we can be sure of is that each version demands plenty. Perhaps the romance couplet always demanded most, as it headed towards the freedom…'},
  {num: 40, type: "legal", sentence: 'So I\'m sick and tired of hearing\' Women\'s issues\' which is just a euphemism for abortion, really.\" The women in Tampa take that message to heart. The 2020 election, many of them tell me, is about a bigger clash of ideals.\" For me, it\'s freedom'}
]


  var stims = _.shuffle(stimuli);
  exp.stims = stims.slice(0,10);

  //blocks of the experiment:
  exp.structure = [
    "i0",
    "legal",
    "instructions",
    "example",
    "almost",
    "trial",
    "trial",
    "trial",
    "trial",
    "trial",
    "trial",
    "trial",
    "trial",
    "trial",
    "trial",
    "thanks"
  ];

  //make corresponding slides:
  exp.slides = make_slides(exp);

  $('.slide').hide(); //hide everything

  exp.go(); //show first slide
}
