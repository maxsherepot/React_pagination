import React, { Component } from "react";
import ReactPaginate from 'react-paginate';
import "./style.css";



class Pagination extends Component {

    state = {
        offset: 0,
        data: [],
        elements: [],
        perPage: 10,
        currentPage: 0,
    };

    getData() {
        fetch("https://jsonplaceholder.typicode.com/todos?_limit=100")
            .then(response => response.json())
            .then(data => this.setState({
                data,
                pageCount: Math.ceil(data.length / this.state.perPage)
            }))
            .then(() => this.setElementsForCurrentPage())
            .catch(error => console.log(error))
    }

    componentDidMount() {
        this.getData();
    }

    setElementsForCurrentPage() {
        const elements = this.state.data
            .slice(this.state.offset, this.state.offset + this.state.perPage)
            .map(item =>
                (<li
                    key={item.id}
                    className="list-group-item bg-light"
                >{item.id}. {item.title}</li>)
            );
        this.setState({ elements });
    }

    handlePageClick = (data) => {
        const selectedPage = data.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({ currentPage: selectedPage, offset: offset }, () => {
            this.setElementsForCurrentPage();
        });
    }


    render() {
        const previousLabel = <button
            className="btn m-0">prev</button>
        const nextLabel = <button
            className="btn m-0">next</button>

        let paginationElement;
        if (this.state.pageCount > 1) {
             paginationElement = (
                <ReactPaginate
                    previousLabel={previousLabel}
                    nextLabel={nextLabel}
                    breakLabel={<span className="gap">...</span>}
                    pageCount={this.state.pageCount}
                    onPageChange={this.handlePageClick}
                    forcePage={this.state.currentPage}
                    containerClassName={"pagination"}
                    previousLinkClassName={"previous_page"}
                    nextLinkClassName={"next_page"}
                    disabledClassName={"disabled"}
                    activeClassName={"active"}
                />
            );
        };


        return (
            <div>
                {this.state.elements}
                {paginationElement}
            </div>
        );
    };
};



export default Pagination;
