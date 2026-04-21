class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); 
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); 
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; 

        // my interactive mechanism is where the coach will give new advice everytime you ask him by randomzing through an array using javascript math functions
        // first i check for the advice array in the location the player is at
        if("Advice" in locationData){
            // store one of the advice pieces into a variable that will be displayed
            let pieceOfAdvice = locationData.Advice[Math.floor(Math.random() * locationData.Advice.length)];
            this.engine.show("Here is my advice for you: " + pieceOfAdvice);
        }
        // locations without advice follow what they have in their body
        else{
            this.engine.show(locationData["Body"]);
        }

        if("Choices" in locationData){
            for (let choice of locationData["Choices"]){
                this.engine.addChoice(choice.Text, choice);
            }
        }
        else{
            this.engine.addChoice("The End.")
        }
    }

    handleChoice(choice) {
        // this is what i adjusted the most, for my lock and key puzzle to work
        if(choice){
            if(choice.hasKey){
                this.engine.playerKey = choice.hasKey;
            }
            
            // finds the location of where the player wants to go to, storing it in keyData
            let keyData = this.engine.storyData.Locations[choice.Target];

            // checks if the location needs a key, in my case only right wing, and if the player does NOT have the key
            if(keyData.NeedsKey && this.engine.playerKey !== "longThrowKey"){
                // i used this logic because there are a lot more locations that don't need a key that do
                // if this is true, the game will show a message saying you missed a pass and send you back to the center field screen
                this.engine.show(keyData.GameOver);
                this.engine.gotoScene(Location, keyData.GameOverTarget);
                return;
            }
            // if not true, go to the scene the player is requesting to go to
            this.engine.gotoScene(Location, choice.Target);
        }
        else{
            this.engine.gotoScene(End);
        }
        
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);


        let locationData = this.engine.storyData.Locations[key];


    }
}

Engine.load(Start, 'myStory.json');