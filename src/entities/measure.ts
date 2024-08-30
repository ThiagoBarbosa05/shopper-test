import { Entity } from "../core/entities/entity"


interface MeasureProps {
  customerCode: string
  datetime: string
  type: 'GAS' | 'WATER'
  value: number
  isConfirmed: boolean
  imageUrl: string
}

export class Measure extends Entity<MeasureProps> {

  get customerCode() { 
    return this.props.customerCode
  }

  get datetime() {
    return this.props.datetime
  }

  get type() {
    return this.props.type
  }

  get value() {
    return this.props.value
  }

  set value(value: number) {
    this.props.value = value
  }

  get isConfirmed() {
    return this.props.isConfirmed
  }

  get imageUrl() {
    return this.props.imageUrl
  }

  set isConfirmed(value: boolean) {
    this.props.isConfirmed = value
  }

  static create(props: MeasureProps, id?: string) {
    const measure = new Measure(props, id)

    return measure
  }
}