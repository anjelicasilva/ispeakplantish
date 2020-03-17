  
class HomePage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        randomPlantOfTheDay: null,
      }
  }


  componentDidMount() {
    this.fetchHouseplantOfTheDay();
 }

 
  async fetchHouseplantOfTheDay() {
    const randomHouseplantResponse = await fetch(`/api/plant_of_the_day`);
    const randomHouseplantJson = await randomHouseplantResponse.json();

    for (const randomPlant of Object.entries(randomHouseplantJson)) {

        const plantOfTheDay = {
            randomHouseplantId: randomPlant[1]['common_houseplant_id'],
            randomHouseplantPhotoUrl: randomPlant[1]['common_houseplant_photo_url'],
            randomCommonName: randomPlant[1]['common_name'],
            randomLatinName: randomPlant[1]['latin_name'],
            randomGeneralDescription: randomPlant[1]['general_description'],
            randomRecommendedLightRequirements: randomPlant[1]['light_requirements'],
        }
        this.setState({
          randomPlantOfTheDay: plantOfTheDay,
      });
    };
}


  renderPlantOfTheDay() {
    const plantOfTheDayInfo = []
                
      plantOfTheDayInfo.push(
          <div className="plant-moment-text" key={this.state.randomPlantOfTheDay['randomCommonName']}>
              <img id="plant-moment-img" src={this.state.randomPlantOfTheDay['randomHouseplantPhotoUrl']}></img>
              <h4>Common Name:</h4> 
              <p className="plant-moment-p">{this.state.randomPlantOfTheDay['randomCommonName']}</p>
              <h4>Latin Name:</h4>
              <p className="plant-moment-p">{this.state.randomPlantOfTheDay['randomLatinName']}</p>
              <h4>Light Requirement:</h4>
              <p className="plant-moment-p">{this.state.randomPlantOfTheDay['randomRecommendedLightRequirements']}</p>
              <h4>General Description:</h4>
              <p className="plant-moment-p">{this.state.randomPlantOfTheDay['randomGeneralDescription']}</p>
          </div>
    )
    return plantOfTheDayInfo     
  }


  getRandomHouseplant() {
    if (this.state.randomPlantOfTheDay !== null) {
      return (this.renderPlantOfTheDay())
    }
  }


    render() {
    return (
      <div>
      <div className="sticky">
        <div className="my-homepage-bg"></div>
      </div>

      <div className="modal-dialog text-center">
      <div className="col-sm-8 main-section">
          <div className="modal-content">
              <form className="col-12">
                  <div className="form-group">
                    <div id="homepage" className="homepage">
                      <h3 id="plant-moment">Plant of the Moment</h3>
                      {this.getRandomHouseplant()}
                    </div>
                  </div>
              </form>
          </div> 
      </div>
  </div>
  </div>













    );
    }
  } 





 








