import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col, DropdownButton, MenuItem, Button, FormGroup, FieldGroup, FormControl, ControlLabel } from 'react-bootstrap';
import * as actions from '../../actions/orderFormActions';

export class OrderForm extends React.Component {

    handleTabClick = (event) => {
        this.props.actions.updateOrderFormTab( event.target.getAttribute('data-tab') );
    };

    handleBuySellToggle = () => {
        this.props.actions.toggleBuySellOrderForm();
    };

    handleExchangeSelection = (value) => {
        this.props.actions.updateOrderFormExchange( value );
    };


  render() {
		return (
		  	<div className="card card-fh card-order-form">
		  		<div className="card-fixed-header">
					<h2 className="card-title" data-card="orderform" >Order Form</h2>
				</div>
				<div className="card-panel-body p-15">
					<div className="tabs">
						<ul className="tab-header-list">
							<li onClick={this.handleTabClick} data-tab='market' className={(this.props.orderForm.activeTab == 'market' ? 'active' : '')} >Market</li>
							<li onClick={this.handleTabClick} data-tab='limit' className={(this.props.orderForm.activeTab == 'limit' ? 'active' : '')} >Limit</li>
							<li onClick={this.handleTabClick} data-tab='stop' className={(this.props.orderForm.activeTab == 'stop' ? 'active' : '')} >Stop</li>
						</ul>
						<div className="clearfix"></div><br />
						<div className="tab-content">
							<Button onClick={this.handleBuySellToggle} className={(this.props.orderForm.isBuy ? 'primary' : '') + " btn hw" } >Buy</Button>
							<Button onClick={this.handleBuySellToggle} className={(!this.props.orderForm.isBuy ? 'secondary' : '') + " btn hw" } >Sell</Button>
							<div className="clearfix"></div><br />
							<FormGroup>
								<ControlLabel className="lbl-sm">Amount</ControlLabel>
								<div className="form-input-group">
									<FormControl type="text" placeholder="0.00" className="form-input" value={this.props.orderForm.buyAmount} />
									<span>{ !this.props.orderForm.isBuy || this.props.orderForm.activeTab == 'limit' ? this.props.currentPair.unit1 : this.props.currentPair.unit2 }</span>
								</div>
							</FormGroup>
							<div className="clearfix"></div><br />
							<div className={(this.props.orderForm.activeTab == 'limit' ? 'show' : 'hide')}>
								<FormGroup>
									<ControlLabel className="lbl-sm">Limit Price</ControlLabel>
									<div className="form-input-group">
										<FormControl type="text" placeholder="0.00" className="form-input" value={ this.props.orderForm.limitPrice } />
										<span>{ this.props.currentPair.unit2 }</span>
									</div>
								</FormGroup>
								<div className="clearfix"></div><br />
							</div>
							<div className={(this.props.orderForm.activeTab == 'stop' ? 'show' : 'hide')}>								
								<FormGroup>
									<ControlLabel className="lbl-sm">Stop Price</ControlLabel>
									<div className="form-input-group">
										<FormControl type="text" placeholder="0.00" className="form-input" value={ this.props.orderForm.limitPrice } />
										<span>{ this.props.currentPair.unit2 }</span>
									</div>
								</FormGroup>
								<div className="clearfix"></div><br />
							</div>
							<div className="sep-line"></div>
							<div className="clearfix">
								<div className="pull-left">
								    <label className="lbl-sm">Total
								        <small>({ this.props.orderForm.isBuy ? this.props.currentPair.unit1 : this.props.currentPair.unit2 })</small>=
                                    </label>
                                </div>
								<div className="pull-right"><label className="lbl-sm">{this.props.orderForm.buySize}</label></div>
							</div>
							<div className="clearfix"></div><br />
							<div className="clearfix">
								<div className="pull-left"><label className="lbl-sm">Exchange :</label></div>
								<div className="pull-right">
                                    <DropdownButton pullRight title={this.props.orderForm.exchange} id="exchange-selection-dropdown">
                                        {this.props.appData.exchanges.map((object, i) => (
                                            <MenuItem key={i} onSelect={this.handleExchangeSelection} eventKey={object}>{object}</MenuItem>
                                        ))}
                                    </DropdownButton>
                                </div>
							</div>
							<div className="clearfix"></div><br />
							<Button className={( this.props.orderForm.isBuy ? 'primary' : 'secondary' ) + " btn block" } onClick={this.handleOrders}>Place Buy Order</Button>
						</div>
						<br />
					</div>
				</div>
			</div>
		);
  }
}

function mapStateToProps(state) {
  return {
	currentPair: state.currentPair,
	orderForm : state.orderForm,
	appData : state.appData
  };
}

function mapDispatchToProps(dispatch) {
  return {
	actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderForm);
