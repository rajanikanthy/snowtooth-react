import React, { useState, useEffect } from 'react';
import { Table, Icon, Button, Switch, Input, Card } from 'antd';
import { LIFT_ROOT_QUERY, UPDATE_LIFT_STATUS } from '../../container/layout';
import { Query, Mutation } from 'react-apollo';

const LiftDashboard = (props) => {

    const liftStatusChangeHandler = (checked, event) => {
        console.log(dataSource);
    }


    const columns = [{
        title: 'Lift Name',
        dataIndex: 'name',
        key: 'name'
    }, {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status, record, index) => {
            let statusElement = (
                <Mutation mutation={UPDATE_LIFT_STATUS} variables={{ liftId: record.id, liftStatus: 'OPEN' }}>
                    {
                        updateLiftStatus => <Switch id={record.id} checked={true} onChange={updateLiftStatus} />
                    }
                </Mutation>

            )
            switch (status) {
                case 'OPEN':
                    statusElement = (<Mutation mutation={UPDATE_LIFT_STATUS} variables={{ liftId: record.id, liftStatus: 'CLOSED' }}>
                        {
                            updateLiftStatus => <Switch id={record.id} checked={true} onChange={updateLiftStatus} />
                        }
                    </Mutation>)
                    break;
                case 'CLOSED':
                        statusElement = (<Mutation mutation={UPDATE_LIFT_STATUS} variables={{ liftId: record.id, liftStatus: 'OPEN' }}>
                        {
                            updateLiftStatus => <Switch id={record.id} checked={false} onChange={updateLiftStatus} />
                        }
                    </Mutation>)
                    break;
                default:
            }
            return statusElement;
        }
    }, {
        title: 'Capacity',
        dataIndex: 'capacity',
        key: 'capacity'
    }, {
        title: 'Open Nights',
        dataIndex: 'night',
        key: 'night',
        render: (night) => {
            if (night) {
                return (<Icon type="check-circle" theme='outlined' style={{ fontSize: '30px', color: 'green' }} />)
            } else {
                return (<Icon type="minus-circle" theme='outlined' style={{ fontSize: '30px', color: 'red' }} />)
            }
        }
    }, {
        title: 'Elevation Gain',
        dataIndex: 'elevationGain',
        key: 'elevationGain'
    }];

    const [dataSource, setDataSource] = useState([]);
    //const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [searchText, setSearchText] = useState("");
    let filteredDataSource = [];

    const applyFilter = (data) => {
        console.log("Apply Filter called with search Text as " + searchText);
        if (searchText === "") {
            return data;
        } else {
            const filteredRecords = data.filter( rec => {
                const filteredColumns = columns.filter( col => {
                    return rec[col.dataIndex]
                        .toString()
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                });
                return filteredColumns !== null && filteredColumns.length !== 0;
            });
            return filteredRecords;
        }
    }

    const onSearchTextChangeHandler = (e) => {
        setSearchText(e.target.value);
        setDataSource([]);
    }

    useEffect(() => {
        console.log("Use Effect Called.")
    }, []);

    const extras = () =>  (
        <div>
            <Input type="text" placeholder="Search" onChange={onSearchTextChangeHandler}/>
        </div>
    )

    return (
        <Query query={LIFT_ROOT_QUERY}>
            {({ data, loading, refetch }) => {
                console.log("Fetch lift status .......");
                //console.log(refetch);
                console.log(data);
                if (loading) {
                    return (
                    <Card title="Lift Status" extra={extras()}>
                        <Button type="primary" onClick={() => refetch()}>
                            Refresh
                        </Button>
                        <Table dataSource={[]} columns={columns} />
                     </Card>)
                } else {
                    return (
                        <Card title="Lift Status - Dashboard" extra={extras()}>
                            <Button type="primary" onClick={() => refetch()}>
                                Refresh
                            </Button>
                            <Table dataSource={applyFilter(data.allLifts)} columns={columns} />
                        </Card>
                    )
                            
                }
            }
            }
        </Query>
    )
}

export default LiftDashboard;