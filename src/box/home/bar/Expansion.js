import React, {Component} from 'react';
import { Step, Stepper, StepButton, StepContent,} from 'material-ui/Stepper';



class Expansion extends Component {
   
    constructor(props) {
        super(props);
        this.state = {course: {name: '-'}, stepIndex: -1,steps: []};
    };

    render(){
        return(
            <div style={{width: '100%', margin: 'auto'}}>
                <Stepper
                    activeStep={this.state.stepIndex}                    
                    linear={false}
                    orientation="vertical">
                    <Step key={0}>
                        <StepButton onClick={() => this.setState({stepIndex: 0})}>
                            <div>{'nome'}</div>
                        </StepButton>
                        <StepContent>
                            <p>
                                {'teste 1'}
                            </p>

                        </StepContent>
                    </Step>
                    <Step key={1}>
                        <StepButton onClick={() => this.setState({stepIndex: 1})}>
                            <div>{'nome'}</div>
                        </StepButton>
                        <StepContent>
                            <p>
                                {'teste 1'}
                            </p>
                            <p>
                                {'teste x'}
                            </p>
                            <p>
                                {'teste g'}
                            </p>
                        </StepContent>
                    </Step>
                    <Step key={2}>
                        <StepButton onClick={() => this.setState({stepIndex: 2})}>
                            <div>{'nome'}</div>
                        </StepButton>
                        <StepContent>
                            <p>
                                {'teste 1'}
                            </p>
                            <p>
                                {'teste x'}
                            </p>
                            <p>
                                {'teste g'}
                            </p>
                        </StepContent>
                    </Step>
                </Stepper>
            </div>
        )
    }
    
}
  

  
export default Expansion;
  