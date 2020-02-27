import React, { Component, Profiler } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Wardrobe extends Component {
    state = {
        garments: []
    }

    componentDidMount = () => {
        this.getUserGarments()
    }

    getUserGarments = async () => {
        let { user } = this.props
        let URL = ``
        try {
            let results = await axios.get(URL)
            console.log(results.data.payload)
            this.setState({
                garments: results.data.payload
            })
        } catch (err) {
            console.log(err)
        }
    }

    handleGarmentSubmit = async () => {
        let { user } = this.props
        let URL = ``
        try {
            await axios.post(URL)
        } catch (err) {
            console.log(err)
        }
    }

    render () {
        const { user } = this.props;
        const { garments } = this.state;
        const garmentComponents = [];
        // garments.forEach(garment => {
        //     garmentComponents.push(
        //         <Link>
        //             <div className='garment'>

        //             </div>
        //         </Link>
                
        //     )
        // });
        return (
            <div className='main'>
                <div className='header'>
                    <h3></h3>
                    <div className='logo'>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/4/45/Yankees_logo.svg"/>
                    </div>
                    <div>

                    </div>
                </div>
                <div className='garments-container'>
                    {/* {garmentComponents} */}
                </div>
            </div>
        )
    }
}

export default Wardrobe