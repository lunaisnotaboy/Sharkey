<!--
SPDX-FileCopyrightText: syuilo and other misskey contributors
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<!-- eslint-disable vue/no-mutating-props -->
<XContainer :draggable="true" @remove="() => $emit('remove')">
	<template #header><i class="ph-image-square ph-bold ph-lg"></i> {{ i18n.ts._pages.blocks.image }}</template>
	<template #func>
		<button @click="choose()">
			<i class="ph-folder ph-bold ph-lg"></i>
		</button>
	</template>

	<section>
		<MkDriveFileThumbnail v-if="file" style="height: 150px;" :file="file" fit="contain" @click="choose()"/>
	</section>
</XContainer>
</template>

<script lang="ts" setup>
/* eslint-disable vue/no-mutating-props */
import { onMounted } from 'vue';
import XContainer from '../page-editor.container.vue';
import MkDriveFileThumbnail from '@/components/MkDriveFileThumbnail.vue';
import * as os from '@/os.js';
import { i18n } from '@/i18n.js';

const props = defineProps<{
	modelValue: any
}>();

const emit = defineEmits<{
	(ev: 'update:modelValue', value: any): void;
}>();

let file: any = $ref(null);

async function choose() {
	os.selectDriveFile(false).then((fileResponse) => {
		file = fileResponse[0];
		emit('update:modelValue', {
			...props.modelValue,
			fileId: file.id,
		});
	});
}

onMounted(async () => {
	if (props.modelValue.fileId == null) {
		await choose();
	} else {
		os.api('drive/files/show', {
			fileId: props.modelValue.fileId,
		}).then(fileResponse => {
			file = fileResponse;
		});
	}
});
</script>
