var tos = ['They think I do great work. It\'s things like the parody video that turns me off to photography as a business. I have no interest in dealing with prospects and clients, answering to their whims, or compromising my freedom…',
'Gov Corbett is moving money away from public schools into an expansion of charter schools and vouchers. Even though the budgets of our school districts have been cut they are required to fund charter schools within the district. "These institutions give educators the freedom…',
'What is the very best way to get the Amazon system to work for you when you\'re promoting its products? Offering your buyers a wide selection of products to choose from offers them lots of freedom…',
'It was our Japanese publisher, Sunsoft, who approached us out of the blue asking us if we\'d do a game for an older audience. We shared a tremendous amount of mutual respect toward one another and we were given total creative freedom…',
'No, substantively, nothing has changed. It might be comforting to dig for the positives but the fact remains that this ruling will keep Obama in the WH. There will be nothing left of freedom…',
'One final commonality, though, is less heartening: many organizations appear scared to death of Enterprise 2.0. They\'re worried that people will use the new tools and accompanying freedom…',
'Our constitution grants to each citizen the liberty and freedom to determine their own perception of reality. We simply ask each American citizen to exercise their freedom…',
'We allowed Percival to modify the starting conditions of this system to see if that would allow us to get to the current situation. At least, that was what we intended. It turns out that we gave Percival the additional freedom… ',
'She said, "I live in luxury now. I don\'t have to spend time with people I don\'t like. I have complete freedom…',
'Once I\'m airborne, the kite responds like a parachute, slowing my descent. I glide for a few seconds before landing on a feathery cushion of waist-deep joy. But most liberating is the sheer freedom…'];

var froms = ['Human freedom is thus distinct from the kind of freedom talked about by animal liberationists. Human freedom is largely our ability to act free of external constraints, but also freedom…',
'Both the Religious Test Clause and the First Amendment of the Constitution are not guarantees of religious heterogeneity--they are guarantees of a freedom…',
'Libraries = Intellectual Freedom. Libraries are already one of the leaders in intellectual freedom. We work hard to ensure privacy and freedom…',
'One might argue that anyone prepared to be part of a mob is not a classic, individual-liberty conservative. After all, the American revolution was not, unlike the French, a blood-bath for equality, but a war for freedom…',
'I am thrilled to see Occupy working so constructively to help all those who think they are trapped in debt realize that the trap is to a large extent, comprised simply of intimidation, and that with some of the right kind of guidance and thought, one can get free. Life\'s problems and our society\'s problems must still be faced, but once one has attained freedom…',
'Then Peter Gorman offered the winners the chance to work at one of the worst schools in the district. In exchange, the principals would get a raise, freedom…',
'I turn to see Grandmother, wiping her eyes and lighting a candle at her shrine. She makes the Sign of the Cross, then tells me a story about the rich man who had everything he wanted except freedom…',
'Subjective performance is conceptualized as a combination of both the athletes\' perception of their own performance and the athletes\' perception of the coaches\' perception of the athletes\' performance level. Subjective performance correlated best with adversity, concentration, confidence, and freedom…',
'Knowing constitutional law requires full knowledge of all four Organic Laws of the United States of America and the only way to acquire that knowledge is to read and study those laws. Together, the Declaration of Independence and the Articles of Confederation provide a path to freedom…',
'I also believe that in five years or so (if not earlier), functional languages will hit the mainstream in a big way (particularly statically-typed FLs). The advantages of the type systems, the strong type checking, and the freedom…'];

var ofs = ['Ten years ago, 106 nations affirmed their dedication to respecting and upholding core democratic values including the right of citizens to choose their representatives through regular, free, and fair elections with universal and equal suffrage; to equal protection under the law; and to freedom…',
'What happened to those beautiful statutes enunciated in the constitution which guarantee the sanctity of the citizen\'s life, property, and the many other rights such as the right to freedom…',
'Unlimited means unlimited. I don\'t care if I only use 2GB of data half the year. It\'s the freedom…',
'If the ideals of Utopia are realized universally, mankind shall find the strength to regain its freedom and to preserve God\'s image and likeness -- human individuality -- once it has glanced into the yawning abyss. But will even that experience be sufficient? For it seems just as certain that the freedom…',
'They, more than anyone, understand that what they protect is not a dead soldier, but a symbol of the value we place on those who gave their lives to defend the country they love, its way of life and the freedom…',
'It continues to lay claim to a chain of disputed islands in the East China Sea, and it has built 2,000 acres of new islands from sand and coral in the South China Sea, replete with bases and runways. In May, the United States started sending Navy warships to within 12 nautical miles of the islands to assert freedom…',
'“It brought a lot of threats from people already saying I\'ll never work again," she told the newspaper. "If that\'s what America has come to, where we all hate and bully people, there\'s no more freedom…',
'It was then, at fifteen, when Megan and I met our first humans. Until that point the technicians kept us in atelier tanks -- alive and conscious, fed information and nutrients through a series of cables and tubes. The tanks gave us freedom…',
'But as your relationship subtly intensified, she choose the practicality and constraint of her and him over the irrationality and freedom…'];
var stimuli = {"from": froms, "to": tos, "of": ofs};

// set up experiment logic for each slide
function make_slides(f) {
  var slides = {};

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
    var text = $('#example_answer').val();
    var classification = $('#response-buttons button:selected').val()
    console.log([text, classification]);
  }
  
});
  
slides.almost = slide({
  name: "almost",
  start: function() {
    document.getElementById("example_answer").value = "";
  }

});

  slides.trial = slide({
    name: "trial",
    // To rotate through stimulus list:
    present: exp.stimuli,
    present_handle : function() {
      $(".err").hide();
      $('#done').click(() => {
        this.text = $('#text_answer').val();
        this.classification = $('#response-buttons button:selected').val()
    });
  },

    start: function() {

      // Get all the keys from the object:
      var keys = Object.keys(stimuli);

      // Choose a random key from the array of keys:
      var random_freedom = keys[Math.floor(Math.random() * keys.length)];

      // Values for the chosen key:
      var values = stimuli[random_freedom];

      // Choose a random value from this array:
      var stim = values[Math.floor(Math.random() * values.length)];

      // Pop the chosen value from the array of values and update stimuli
      stimuli[random_freedom] = values.splice(values.indexOf(stim), 1);


        // store stimulus data
        this.stim = stim;
        document.getElementById('buttons').style.display = "none";
        this.input = document.getElementById("text_answer").value = "";
        document.querySelector("#stimulus-sentence").innerHTML = stim;
        this.classification = $('#response-buttons button:selected').val()
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

//forces a text input on each slide
function next() {
  if (document.getElementById("example_answer").value === "" & document.getElementById("text_answer").value === "") {
      alert("Textbox must be filled!");
      event.preventDefault();
    }
  else {
    exp.trials.push({
      "stim" : this.stim,
      "text" : this.input,
      "classification" : this.classification
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

  exp.stimuli = stimuli;

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
