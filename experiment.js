var trial_counter = 0;
function slide_set() {
}

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
  // set up the first example slide
  slides.instructions = slide({
    name: "instructions",

    // this is executed when the slide is shown
    start: function() {
      // hide error message
      $('.err').hide();
      $('example_buttons').hide();
    }
  });

//    log_responses: function() {
      // add response to exp.data_trials
      // this data will be submitted at the end of the experiment
  //    exp.data_trials.push({
    //    "slide_number_in_experiment": exp.phase,
      //  "id": "instructions",
        //"response": this.radio,
        // "strangeSentence": "",
//      });
  //  },
//  });

slides.example = slide({
  name: "example",

  start: function() {
    // hide error message and buttons
    $('.err').hide();
    $('example_buttons').hide();
    document.getElementById("example_buttons").style.display = "none";
  }

});

  slides.trial = slide({
    name: "trial",

    // To rotate through stimulus list:
    present: exp.stimuli,
    present_handle : function(stim) {

      // store stimulus data
      this.stim = stim;
      //exp.stimuli = _.shuffle(stimuli); //call _.shuffle(stimuli) to randomize the order;
      exp.item = exp.stimuli.pop()


      console.log('item',exp.item)

      // replace the placeholder in the HTML document with the relevant sentences for this trial
      $("#stimulus-sentence").html(exp.item);
      $(".err").hide();
    },

    // save response
    log_responses: function() {
      exp.data_trials.push({
        "id": this.stim.ID,
        "legal": this.stim.ID,
        "response": exp.text_answer, //textbox input
        "classification": exp.answer //'object', 'opportunity', 'neither/both'
      });
    },

    start: function() {
      document.getElementById("buttons").style.display = "none";
    }
  });

  //
  slides.thanks = slide({
    name: "thanks",
    start: function() {
      exp.data = {
        "trials": exp.data_trials,
        "catch_trials": exp.catch_trials,
        "system": exp.system,
        "subject_information": exp.subj_data,
        "time_in_minutes": (Date.now() - exp.startT) / 60000
      };
      proliferate.submit(exp.data);
    }
  });

  return slides;
}

function show_example_buttons() {
  var x = document.getElementById("example_buttons");
  x.style.display = "block";

}

function show_buttons() {
    var y = document.getElementById("buttons");
    y.style.display = "block";
}

/// initialize experiment
function init() {

  exp.trials = [];
  //exp.catch_trials = [];
  var stimuli = {to: ["to"], from: ["from"], of: ["of"]}

  exp.stimuli = stimuli;
  exp.stimuli = _.shuffle(stimuli); //call _.shuffle(stimuli) to randomize the order;
  exp.n_trials = 10;

  //blocks of the experiment:
  exp.structure = [
    "i0",
    "instructions",
    "example",
    "almost",
    "trial",
    "thanks"
  ];

  //exp.data_trials = [];

  //make corresponding slides:
  exp.slides = make_slides(exp);

  $('.slide').hide(); //hide everything

  exp.go(); //show first slide
}
