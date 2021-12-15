
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Table, TableWrapper, Cell, Row, Rows, Col, Cols } from 'react-native-table-component';

const Separator = (props) =>
  <View style={{ height: '100%', width: 1, backgroundColor: 'grey' }} />

export default class App extends Component {
  constructor(props) {
    super(props);
    

    this.fields = [
      { key: 'code', title: 'MARCA', width: 200 },
   
    ];

    const dataFields = this.fields.slice(1);

    this.rows = Array.apply(null, Array(125)).map(
      (item, idx) => ({
        code: `TEST-MARK-AREA-X-ITEM-${idx}`,
        responsable: `RESPONSABLE-${idx}`,
        piezas: 1,
        peso: idx * 312,
        inicio: '2019-02-01',
        termino: '2019-04-30',
        hab: 0,
        arm: 0,
        bar: 0,
        sol: 0,
        insp: 0,
      })
    );

    this.state = {
      data: this.rows.map(row =>
        dataFields.map(field => row[field.key])
      ),
      tableHead: dataFields.map(field => field.title),
      widthArr: dataFields.map(field => field.width),
    };

    this.onScroll = this.onScroll.bind(this);
  }

  onScroll(e, target) {
    target ? target.scrollTo({ y: e.nativeEvent.contentOffset.y }) : undefined;
  }

  render() {
    const fields = this.state.data;
    const state = this.state;

    const marks = this.rows.map(
      row => ([row.code])
    );

    const example3 = (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <Table borderStyle={{borderColor: '#C1C0B9'}}>
              <Cell data={this.fields[0].title} width={this.fields[0].width} style={styles.header} textStyle={styles.headerText}/>
            </Table>
            <View>
              <ScrollView style={styles.dataWrapper} ref={table => this._first = table} onScroll={e => this.onScroll(e, this._last)}>
                <Table borderStyle={{borderColor: '#C1C0B9'}}>
                  <Col data={marks} textStyle={styles.text} width={this.fields[0].width} />
                </Table>
              </ScrollView>
            </View>
          </View>

          <ScrollView horizontal={true}>
            <View>
              <Table borderStyle={{borderColor: '#C1C0B9'}}>
                <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.headerText}/>
              </Table>
              <View>
                <ScrollView style={styles.dataWrapper} ref={table => this._last = table}>
                  <Table borderStyle={{borderColor: '#C1C0B9'}}>
                    <Rows data={this.state.data} textStyle={styles.text} widthArr={state.widthArr} />
                  </Table>
                </ScrollView>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );

    return example3;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#212732'
  },
  header: {
    height: 50,
    backgroundColor: '#242b38'
  },
  headerText: {
    textAlign: 'center',
    fontWeight: '100',
    color: 'white',
  },
  text: {
    textAlign: 'center',
    fontWeight: '100',
    color: '#fefefe',
  },
  dataWrapper: {
    marginTop: -1
  },
  row: {
    height: 40,
    backgroundColor: '#2c3445'
  }
});
