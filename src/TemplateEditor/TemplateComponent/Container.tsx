import { TemplateContainer } from '../../utils/dtoWrappers';
import { Condition } from './Condition';
import { String } from './String';
import styles from './Container.module.css'

export function Container({ self }: { self: TemplateContainer }) {
    return (
        <div className={styles.container}>{
            self.children.map(c => {
                switch (c.type) {
                    case 'String':
                        return <String key={c.id} self={c} />
                    case 'Condition':
                        return <Condition key={c.id} self={c} />
                    default:
                        throw new Error('no such type')
                }
            })
        }</div>
    )
}