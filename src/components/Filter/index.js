// src/components/About/index.js
import React, { Component } from 'react';
import classnames from 'classnames';
import './style.css';

import {
    SearchBox,
    RefinementListFilter,HierarchicalRefinementFilter,
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

class Filter extends Component {
  static propTypes = {}
  static defaultProps = {}
  state = {}
  
  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('About', className)} {...props}>

          <SearchkitProvider searchkit={searchkit}>
            <Layout>
              <TopBar>
                <SearchBox
                  autofocus={true}
                  searchOnChange={true}
                  prefixQueryFields={["gender^1","maritalStatus^2","languages"]}/>
              </TopBar>
              <LayoutBody>
                <SideBar>
                  <HierarchicalMenuFilter class="ItemCheckboxList"
                    fields={["gender", "maritalStatus"]}
                    title="Categories"
                    id="categories"/>
                  <RefinementListFilter
                    id="actors"
                    title="maritalStatus"
                    field="maritalStatus"
                    operator="AND"
                    size={10}/>
                </SideBar>
                <LayoutResults>
                  <ActionBar>

                    <ActionBarRow>
                      <HitsStats/>
                    </ActionBarRow>

                    <ActionBarRow>
                      <SelectedFilters/>
                      <ResetFilters/>
                    </ActionBarRow>

                  </ActionBar>
                  <Hits mod="sk-hits-grid" hitsPerPage={10} itemComponent={MovieHit}
                    sourceFilter={["gender", "maritalStatus", "sup.email"]}/>
                  <NoHits/>
                </LayoutResults>
              </LayoutBody>
            </Layout>
            
          </SearchkitProvider>
      </div>
    );
  }
}

export default Filter;
