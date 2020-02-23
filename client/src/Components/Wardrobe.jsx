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

    render () {
        const { user } = this.props;
        const { garments } = this.state;
        const garmentComponents = [];
        garments.forEach(garment => {
            garmentComponents.push(
                <Link>
                    <div className='garment'>

                    </div>
                </Link>
                
            )
        });
        return (
            <div className='main'>
                <div className='garments-container'>
                    {garmentComponents}
                </div>
            </div>
        )
    }
}

export default Wardrobe