import React from 'react'

class HomeComponent extends React.Component {
    render() {
        return (
            <div className="container">

            <div className="row py-3">
                <div className="col-4">
                    <button type="button" class="btn btn-primary">Crea corso</button>
                </div>
            

                <div className="col-4 mx-auto text-end">
                    <button type="button" class="btn btn-primary">Accedi</button>
                    <button type="button" class="btn ms-2" style={{ backgroundColor: 'green' }}>
                        Registrati
                    </button>
                </div>
            </div>

            </div>
        )
    }
}

export default HomeComponent