import { useEffect, useReducer, forwardRef, useRef, useState } from 'react';
import { useRipple } from './Ripple.jsx';
import Icon from './Icon.jsx';
import css from './SegmentedButtons.module.scss';
import classNames from 'classnames';
import { MdCheck } from 'react-icons/md';

const SegmentedButtons = forwardRef(function SegmentedButtons(props, ref) {
	const containerRef = useRef(null);
	const [leftShadow, setLeftShadow] = useState(false);
	const [rightShadow, setRightShadow] = useState(false);

	const [selected, dispatchSelected] = useReducer((state, action) => {
		switch (action.type) {
			case 'select':
				if (!props.multiple) return action.value;
				return props.buttons
					.filter((btn) => btn.value === action.value || state.includes(btn.value))
					.map((btn) => btn.value);
			case 'deselect':
				if (!props.multiple) return state;
				if (!(props.canEmpty ?? true) && state.length === 1) return state;
				return state.filter((v) => v !== action.value);
			default:
				return state;
		}
	}, props.buttons.filter((btn) => btn.selected).map((btn) => btn.value));

	useEffect(() => {
		if (props.setSelected) props.setSelected(selected);
	}, [selected]);

	// 滚动阴影效果控制
	const [visibleIndices, setVisibleIndices] = useState({ first: 0, last: props.buttons.length - 1 });

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const buttons = Array.from(container.querySelectorAll(`.${css.segmentedButton}`));

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => a.boundingClientRect.left - b.boundingClientRect.left);

				if (visible.length > 0) {
					const firstIdx = buttons.indexOf(visible[0].target);
					const lastIdx = buttons.indexOf(visible[visible.length - 1].target);
					setVisibleIndices({ first: firstIdx, last: lastIdx });
				}
			},
			{
				root: container,
				threshold: 0.8, // 80%可见才算在视口内
			}
		);

		buttons.forEach((btn) => observer.observe(btn));
		return () => observer.disconnect();
	}, [props.buttons]);

	// 自动滚动到选中按钮
	/*useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const selectedButton = container.querySelector(`.${css.segmentedButton}.${css.selected}`);
		if (selectedButton) {
			selectedButton.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
		}
	}, [selected]);*/

	return (
		<div className={css.segmentedButtonsWrapper}>
			{leftShadow && <div className={classNames(css.shadow, css.left)} />}
			<div className={classNames(css.segmentedButtons, props.className)} ref={containerRef}>
				{props.buttons.map((button, index) => (
					<SegmentedButton
						key={button.value}
						label={button.label}
						value={button.value}
						icon={button.icon}
						selected={
							typeof button.selected === 'boolean'
								? button.selected
								: selected.includes(button.value)
						}
						dispatchSelected={dispatchSelected}
						className={classNames({
							firstVisible: index === visibleIndices.first,
							lastVisible: index === visibleIndices.last,
						})}
					/>
				))}
			</div>
			{rightShadow && <div className={classNames(css.shadow, css.right)} />}
		</div>
	);
});

function SegmentedButton(props) {
	const container = useRipple();
	return (
		<button
			ref={container}
			className={classNames(css.segmentedButton, props.className, {
				[css.selected]: props.selected,
			})}
			onClick={() =>
				props.selected
					? props.dispatchSelected({ type: 'deselect', value: props.value })
					: props.dispatchSelected({ type: 'select', value: props.value })
			}
		>
			<Icon className={classNames(css.icon, css.iconCheck)}>
				<MdCheck />
			</Icon>
			{props.icon && <Icon className={classNames(css.icon, css.iconCustom)}>{props.icon}</Icon>}
			<div className={css.label}>{props.label}</div>
		</button>
	);
}

export default SegmentedButtons;
