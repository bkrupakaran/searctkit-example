// src/components/About/index.js
import React, { Component } from 'react';
import classnames from 'classnames';
import * as _ from "lodash"
import './style.css';

import {
    SearchBox,
    RefinementListFilter,
    Hits,
    HitsStats,
    SearchkitComponent,
    SelectedFilters,
    MenuFilter,
    HierarchicalMenuFilter,
    Pagination,
    ResetFilters,
    SearchkitManager,SearchkitProvider,
    NoHits,
    ViewSwitcherToggle,
    ViewSwitcherHits,
    Layout, LayoutBody, LayoutResults,
    SideBar, TopBar,
    ActionBar, ActionBarRow
    } from "searchkit";


const searchkit = new SearchkitManager("http://192.168.50.2:9200/universitycolorado_20160304/person");

class MovieHit extends React.Component {
    render() {
    const result = this.props.result;
    console.log(this.props.result);
        return (
            
            <div class="divRow">
              <div  className="divCell">{result._source.id}</div>
                <div  className="divCell">{result._source.gender}</div>
                <div  className="divCell">{result._source.maritalStatus}</div>
            <div  className="divCell">{result._source.sup.email}</div>
            </div>  
        )
    }  
}

class Search extends Component {
  static propTypes = {}
  static defaultProps = {}
  state = {}
  
  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('About', className)} {...props}>

          <SearchkitProvider searchkit={searchkit}>
             <div className="search"> 
                <div className="search__query">
                  <SearchBox 
                  searchOnChange={true} 
                  prefixQueryFields={["sup.email^1", "gender^2","maritalStatus^3","languages","religion^10"]} />
                </div>
               

                <div className="search__results divTable">
                  <div className="headRow">
                    <div className="divCell" align="center">ID</div>
                    <div  className="divCell">Gender</div>
                    <div  className="divCell">MaritalStatus</div>
                    <div  className="divCell">email</div>
                  </div>
                  <Hits hitsPerPage={10} itemComponent={MovieHit}/><Pagination/>
                </div>

             </div>
            
          </SearchkitProvider>
      </div>
    );
  }
}

export default Search;
