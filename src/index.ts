interface TagGroupBy {
  tag: string
  childName: string
}

interface DynamicObject {
  [key: string]: any
}

export const groupBy = ( array:Array<any>, tagsToGroup:Array<TagGroupBy> ) => {

  let result:any = []

  const existInArray = (array:Array<any>, key:string, target: any) => {
    for(let i=0; i<array.length; i++){
      const element = array[i]
      if(element[key] === target) return {exist: true, index: i};
    }

    return {exist: false, index: -1};
  }

  const group = (array:Array<any>, element: DynamicObject, tagsToGroup:Array<TagGroupBy>) => {
    if(!tagsToGroup || tagsToGroup.length === 0) {
      array.push(element)
      return array;
    }
    
    const tempTags = [...tagsToGroup]

    const targetTag = tempTags.shift() as TagGroupBy

    const {exist, index} = existInArray(array, targetTag.tag, element[targetTag.tag])

    if(!exist){
      let insert:DynamicObject = {}
      
      insert[targetTag.tag] = element[targetTag.tag]
      insert[targetTag.childName] = []

      array.push(insert)
    }

    const indexToManipulate = exist ? index : array.length - 1

    array[indexToManipulate][targetTag.childName] = group(array[indexToManipulate][targetTag.childName], element, tempTags)

    return array
  }

  for(const element of array){
    result = group(result, element, tagsToGroup)
  }

  return result
}